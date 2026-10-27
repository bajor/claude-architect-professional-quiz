(function () {
  "use strict";

  const FIELDS = ["id", "domain", "objectiveId", "difficulty", "type", "prompt", "answers", "tags", "source", "references"];
  const SOURCE_FIELDS = ["name", "url", "section", "accessedAt", "version"];
  const DIFFICULTIES = ["foundational", "intermediate", "advanced"];
  const NEAR_DUPLICATE_THRESHOLD = 0.86;

  function validateQuestionBank(questions) {
    if (!Array.isArray(questions)) return ["Question bank must be an array."];
    const errors = [];
    const ids = new Set();
    const prompts = [];
    questions.forEach((question, index) => {
      const label = question?.id || `Question ${index + 1}`;
      if (!isObject(question)) {
        errors.push(`${label} must be an object.`);
        return;
      }
      FIELDS.forEach((field) => {
        if (!(field in question)) errors.push(`${label} is missing required field: ${field}.`);
      });
      if (!isText(question.id)) errors.push(`${label} must have a non-empty id.`);
      else if (ids.has(question.id)) errors.push(`Duplicate question id: ${question.id}.`);
      else ids.add(question.id);
      validatePrompt(question.prompt, label, prompts, errors);
      validateMapping(question, label, errors);
      validateAnswers(question, label, errors);
      validateCorrectSet(question, label, errors);
      if (!Array.isArray(question.tags) || !question.tags.length || question.tags.some((tag) => !isText(tag))) {
        errors.push(`${label} must have at least one non-empty tag.`);
      }
      validateSource(question.source, label, errors);
      if (!Array.isArray(question.references) || !question.references.length) {
        errors.push(`${label} must have exam-guide references.`);
      } else {
        question.references.forEach((source) => validateSource(source, label, errors));
        if (!question.references.some((source) => source?.url === globalThis.CCARP_BLUEPRINT.exam.url)) {
          errors.push(`${label} must reference the official exam guide.`);
        }
      }
    });
    return errors;
  }

  function validateMapping(question, label, errors) {
    const { domains, objectives } = globalThis.CCARP_BLUEPRINT;
    if (!domains.some((domain) => domain.id === question.domain)) errors.push(`${label} has an unknown domain.`);
    const objective = Object.hasOwn(objectives, question.objectiveId) ? objectives[question.objectiveId] : null;
    if (!objective) errors.push(`${label} has an unknown objective identifier.`);
    else if (objective.domain !== question.domain) errors.push(`${label} objective does not match its domain.`);
    if (!DIFFICULTIES.includes(question.difficulty)) errors.push(`${label} has an invalid difficulty.`);
  }

  function validatePrompt(prompt, label, previous, errors) {
    if (!isText(prompt)) {
      errors.push(`${label} must have a non-empty prompt.`);
      return;
    }
    const normalized = normalize(prompt);
    const words = new Set(normalized.split(" "));
    for (const other of previous) {
      if (normalized === other.normalized) errors.push(`${label} has a duplicate prompt (${other.label}).`);
      else if (similarity(words, other.words) >= NEAR_DUPLICATE_THRESHOLD) {
        errors.push(`${label} has a near-identical prompt (${other.label}).`);
      }
    }
    previous.push({ normalized, words, label });
  }

  function similarity(left, right) {
    const intersection = [...left].filter((word) => right.has(word)).length;
    return intersection / (left.size + right.size - intersection);
  }

  function validateAnswers(question, label, errors) {
    if (!Array.isArray(question.answers) || question.answers.length !== 4) {
      errors.push(`${label} must have exactly 4 answers.`);
      return;
    }
    const texts = question.answers.map((answer) => isObject(answer) && isText(answer.text) ? normalize(answer.text) : "");
    if (texts.some((text) => !text)) errors.push(`${label} has an empty or invalid answer.`);
    if (new Set(texts).size !== 4) errors.push(`${label} has duplicate answer options.`);
    if (question.answers.some((answer) => !isObject(answer) || !isText(answer.explanation))) {
      errors.push(`${label} must explain every answer option.`);
    }
  }

  function validateCorrectSet(question, label, errors) {
    if (question.type === "single") {
      if (!isIndex(question.correct) || "correctIndices" in question) {
        errors.push(`${label} has an invalid single-answer index or mixed answer formats.`);
      }
    } else if (question.type === "multiple") {
      const indices = question.correctIndices;
      if ("correct" in question || !Array.isArray(indices) || indices.length < 2 || indices.length > 3 ||
          indices.some((index) => !isIndex(index)) || new Set(indices).size !== indices.length) {
        errors.push(`${label} has an invalid multiple-response answer set.`);
      } else if (typeof question.prompt !== "string" || !question.prompt.includes(`Select ${indices.length} answers.`)) {
        errors.push(`${label} must explicitly state the multiple-response selection count.`);
      }
    } else errors.push(`${label} has an invalid question type.`);
  }

  function validateSource(source, label, errors) {
    if (!isObject(source)) {
      errors.push(`${label} must have source metadata.`);
      return;
    }
    SOURCE_FIELDS.forEach((field) => {
      if (!isText(source[field])) errors.push(`${label} has invalid source ${field}.`);
    });
    if (!isHttpUrl(source.url)) errors.push(`${label} source URL must be a valid HTTP or HTTPS URL without credentials.`);
    if (!isDate(source.accessedAt)) errors.push(`${label} source accessedAt must be a valid YYYY-MM-DD date.`);
  }

  function isDate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const timestamp = Date.parse(value);
    return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value;
  }

  function isHttpUrl(value) {
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol) && Boolean(url.hostname) && !url.username && !url.password;
    } catch { return false; }
  }

  function isIndex(value) { return Number.isInteger(value) && value >= 0 && value < 4; }
  function isText(value) { return typeof value === "string" && value.trim() !== ""; }
  function isObject(value) { return value !== null && typeof value === "object" && !Array.isArray(value); }
  function normalize(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }

  globalThis.CCARP_SCHEMA = { validateQuestionBank };
})();
