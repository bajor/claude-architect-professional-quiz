"use strict";

require("../blueprint.js");

function question(overrides = {}) {
  const source = {
    name: "Primary documentation", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
    section: "Prompt caching", accessedAt: "2026-10-26", version: "rolling docs"
  };
  return {
    id: "test-question", domain: 2, objectiveId: "2.5", difficulty: "intermediate", type: "single",
    prompt: "A service repeats the same approved policy prefix before different user requests. Which design reduces repeated prefix processing without discarding the policy?",
    answers: [
      { text: "Reuse the stable prefix with caching.", explanation: "Caching can reuse processing for an identical eligible prefix." },
      { text: "Remove the policy.", explanation: "Removing policy changes the required task context rather than reusing it." },
      { text: "Cache all prior responses as the only context.", explanation: "Response memoization does not supply the required policy for new requests." },
      { text: "Increase the output allowance.", explanation: "Output capacity does not reduce repeated input processing." }
    ],
    correct: 0, tags: ["caching"], source,
    references: [{ ...source, name: "Exam guide", url: globalThis.CCARP_BLUEPRINT.exam.url }], ...overrides
  };
}

function multipleQuestion(overrides = {}) {
  const item = question({ type: "multiple", prompt: "Which two controls satisfy the stated policy? Select 2 answers.", ...overrides });
  delete item.correct;
  item.correctIndices = [0, 2];
  return item;
}

function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key)
  };
}

module.exports = { question, multipleQuestion, memoryStorage };
