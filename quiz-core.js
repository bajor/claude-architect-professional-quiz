(function () {
  "use strict";

  const STORAGE_KEY = "claudeArchitectProfessionalQuizProgress.v1";

  function shuffle(items, random = Math.random) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const target = Math.floor(random() * (index + 1));
      [items[index], items[target]] = [items[target], items[index]];
    }
    return items;
  }

  function prepareQuestion(question, random = Math.random) {
    const correct = question.type === "multiple" ? question.correctIndices : [question.correct];
    const answers = question.answers.map((answer, originalIndex) => ({
      ...answer, originalIndex, correct: correct.includes(originalIndex)
    }));
    return { ...question, answers: shuffle(answers, random) };
  }

  function isCorrect(question, selectedIndices) {
    const expected = question.type === "multiple" ? question.correctIndices : [question.correct];
    const selected = new Set(selectedIndices);
    return selectedIndices.length === selected.size && selected.size === expected.length &&
      expected.every((index) => selected.has(index));
  }

  function emptyProgress() { return { totalAttempts: 0, correctCount: 0 }; }

  function validProgress(progress) {
    return progress && Number.isSafeInteger(progress.totalAttempts) && Number.isSafeInteger(progress.correctCount) &&
      progress.totalAttempts >= 0 && progress.correctCount >= 0 && progress.correctCount <= progress.totalAttempts;
  }

  function loadProgress(storage) {
    try {
      const value = JSON.parse(storage.getItem(STORAGE_KEY));
      return validProgress(value) ? { totalAttempts: value.totalAttempts, correctCount: value.correctCount } : emptyProgress();
    } catch { return emptyProgress(); }
  }

  function saveProgress(storage, progress) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(progress));
      return true;
    } catch { return false; }
  }

  globalThis.CCARP_CORE = { STORAGE_KEY, shuffle, prepareQuestion, isCorrect, emptyProgress, loadProgress, saveProgress };
})();
