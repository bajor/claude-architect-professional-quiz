(function () {
  "use strict";

  const core = globalThis.CCARP_CORE;
  const storage = getStorage();
  const state = {
    questions: [],
    deck: [],
    index: 0,
    current: null,
    selected: false,
    selections: new Set(),
    sessionAttempts: 0,
    sessionCorrect: 0,
    progress: core.loadProgress(storage),
    storageAvailable: Boolean(storage)
  };

  const elements = {
    questionCount: document.getElementById("question-count"),
    score: document.getElementById("score"),
    emptyState: document.getElementById("empty-state"),
    emptyStateTitle: document.getElementById("empty-state-title"),
    emptyStateCopy: document.getElementById("empty-state-copy"),
    quizPanel: document.getElementById("quiz-panel"),
    prompt: document.getElementById("prompt"),
    answers: document.getElementById("answers"),
    explanations: document.getElementById("explanations"),
    source: document.getElementById("question-source"),
    nextButton: document.getElementById("next-button"),
    resetButton: document.getElementById("reset-button"),
    bankStatus: document.getElementById("bank-status")
  };
  elements.meta = document.getElementById("question-meta");
  elements.selectionStatus = document.getElementById("selection-status");
  elements.submitButton = document.getElementById("submit-button");
  elements.result = document.getElementById("result");
  elements.sourceDetails = document.getElementById("source-details");
  elements.references = document.getElementById("source-references");

  init();

  function init() {
    state.questions = globalThis.CCARP_QUESTIONS || [];
    const validationErrors = globalThis.CCARP_SCHEMA.validateQuestionBank(state.questions);
    if (validationErrors.length > 0) {
      console.error("Question bank validation failed:", validationErrors);
      elements.bankStatus.textContent = "Question bank validation failed. See the browser console for details.";
      elements.quizPanel.hidden = true;
      return;
    }

    bindEvents();
    rebuildDeck();
    updateBankStatus();
  }

  function bindEvents() {
    elements.nextButton.addEventListener("click", showNextQuestion);
    elements.resetButton.addEventListener("click", resetProgress);
    elements.submitButton.addEventListener("click", submitAnswers);
    document.addEventListener("keydown", handleKeydown);
  }

  function getStorage() {
    try {
      const storage = localStorage;
      const probe = `${core.STORAGE_KEY}.probe`;
      storage.getItem(core.STORAGE_KEY);
      storage.setItem(probe, "1");
      storage.removeItem(probe);
      return storage;
    } catch { return null; }
  }

  function saveProgress() {
    state.storageAvailable = core.saveProgress(storage, state.progress);
    updateBankStatus();
  }

  function updateBankStatus() {
    const saved = `Saved: ${state.progress.correctCount} correct / ${state.progress.totalAttempts} attempts.`;
    const storageStatus = state.storageAvailable ? `${saved} Progress is stored in this browser only.` :
      "Browser storage is unavailable. Progress lasts only for this page session.";
    elements.bankStatus.textContent = `${state.questions.length} questions loaded. ${storageStatus}`;
  }

  function resetProgress() {
    if (!confirm("Reset all stored quiz progress?")) {
      return;
    }

    state.progress = core.emptyProgress();
    state.sessionAttempts = 0;
    state.sessionCorrect = 0;
    saveProgress();
    rebuildDeck();
  }

  function rebuildDeck() {
    state.deck = [...state.questions];

    core.shuffle(state.deck);
    state.index = 0;
    renderDeckState();
  }

  function renderDeckState() {
    if (state.deck.length === 0) {
      state.current = null;
      elements.quizPanel.hidden = true;
      elements.emptyState.hidden = false;
      elements.questionCount.textContent = "Question 0 / 0";
      updateEmptyState();
      updateScore();
      return;
    }

    elements.quizPanel.hidden = false;
    elements.emptyState.hidden = true;
    showQuestion(state.deck[state.index]);
  }

  function updateEmptyState() {
    elements.emptyStateTitle.textContent = "No questions yet.";
    elements.emptyStateCopy.textContent = "Only four-choice questions with explanations for every option are included.";
  }

  function showQuestion(question) {
    state.current = core.prepareQuestion(question);
    state.selected = false;
    state.selections.clear();
    const multiple = question.type === "multiple";
    elements.submitButton.hidden = !multiple;
    elements.submitButton.disabled = true;
    elements.selectionStatus.hidden = !multiple;
    elements.result.hidden = true;
    elements.sourceDetails.open = false;
    elements.questionCount.textContent = `Question ${state.index + 1} / ${state.deck.length}`;
    elements.meta.textContent = `Domain ${question.domain} · Objective ${question.objectiveId} · ${question.difficulty}`;
    elements.prompt.textContent = question.prompt;
    elements.explanations.hidden = true;
    elements.explanations.replaceChildren();
    renderSource(question);
    elements.nextButton.disabled = true;
    elements.answers.replaceChildren();

    state.current.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.dataset.index = String(index);
      if (multiple) button.setAttribute("aria-pressed", "false");
      const key = document.createElement("span");
      key.className = "answer-key";
      key.textContent = String(index + 1);
      button.append(key, answer.text);
      button.addEventListener("click", () => chooseAnswer(index));
      elements.answers.append(button);
    });

    updateSelectionStatus();
    updateScore();
  }

  function chooseAnswer(index) {
    if (!state.current || state.selected) {
      return;
    }

    const answer = state.current.answers[index];
    if (!answer) return;
    const originalIndex = answer.originalIndex;
    if (state.current.type === "multiple") {
      if (state.selections.has(originalIndex)) state.selections.delete(originalIndex);
      else state.selections.add(originalIndex);
      elements.answers.children[index].setAttribute("aria-pressed", String(state.selections.has(originalIndex)));
      updateSelectionStatus();
      return;
    }
    state.selections.add(originalIndex);
    submitAnswers();
  }

  function updateSelectionStatus() {
    if (state.current.type !== "multiple") return;
    const required = state.current.correctIndices.length;
    elements.selectionStatus.textContent = `Select ${required} answers. Selected ${state.selections.size} / ${required}.`;
    elements.submitButton.disabled = state.selections.size !== required;
  }

  function submitAnswers() {
    if (!state.current || state.selected) return;
    if (state.current.type === "multiple" && state.selections.size !== state.current.correctIndices.length) return;
    state.selected = true;
    elements.submitButton.disabled = true;
    const correct = core.isCorrect(state.current, [...state.selections]);
    state.sessionAttempts += 1;
    if (correct) {
      state.sessionCorrect += 1;
    }
    recordProgress(correct);

    [...elements.answers.children].forEach((button, buttonIndex) => {
      button.disabled = true;
      const answer = state.current.answers[buttonIndex];
      if (answer.correct) {
        button.classList.add("correct");
      } else if (state.selections.has(answer.originalIndex)) {
        button.classList.add("incorrect");
      }
    });

    renderExplanations(state.current.answers);
    elements.explanations.hidden = false;
    elements.result.textContent = correct ? "Correct." : "Incorrect. Review all four explanations below.";
    elements.result.hidden = false;
    elements.nextButton.disabled = false;
    elements.nextButton.focus();
    updateScore();
  }

  function recordProgress(correct) {
    state.progress.totalAttempts += 1;

    if (correct) {
      state.progress.correctCount += 1;
    }

    saveProgress();
  }

  function showNextQuestion() {
    if (!state.current || !state.selected) {
      return;
    }

    state.index = (state.index + 1) % state.deck.length;
    showQuestion(state.deck[state.index]);
  }

  function handleKeydown(event) {
    if (event.repeat) {
      if (event.key === "Enter") event.preventDefault();
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey ||
        event.target.matches("input, select, textarea, a, summary, [contenteditable='true']") ||
        event.target === elements.resetButton) {
      return;
    }

    if (["1", "2", "3", "4"].includes(event.key)) {
      event.preventDefault();
      chooseAnswer(Number(event.key) - 1);
    }
    if (event.key === "Enter" && state.current && (state.selected || state.current.type === "multiple")) {
      event.preventDefault();
      if (state.selected) showNextQuestion();
      else submitAnswers();
    }
  }

  function updateScore() {
    elements.score.textContent = `Score: ${state.sessionCorrect} / ${state.sessionAttempts}`;
  }

  function sourceLink(source) {
    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = source.name;
    return link;
  }

  function renderSource(question) {
    elements.source.replaceChildren("Source: ", sourceLink(question.source));
    elements.references.replaceChildren();
    const objective = document.createElement("p");
    objective.textContent = globalThis.CCARP_BLUEPRINT.objectives[question.objectiveId].statement;
    elements.references.append(objective);
    [question.source, ...question.references].forEach((source) => {
      const paragraph = document.createElement("p");
      paragraph.append(sourceLink(source), ` · ${source.section} · ${source.version} · Verified ${source.accessedAt}`);
      elements.references.append(paragraph);
    });
  }

  function renderExplanations(answers) {
    answers.forEach((answer, index) => {
      const item = document.createElement("section");
      item.className = `option-explanation ${answer.correct ? "correct" : "incorrect"}`;

      const title = document.createElement("p");
      title.className = "option-explanation-title";
      title.textContent = `${answer.correct ? "Correct" : "Incorrect"} choice ${index + 1}: ${answer.text}`;

      const copy = document.createElement("p");
      copy.textContent = answer.explanation;
      item.append(title, copy);
      elements.explanations.append(item);
    });
  }

})();
