"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const { question, multipleQuestion, memoryStorage } = require("./fixtures.js");
require("../quiz-core.js");
const core = globalThis.CCARP_CORE;

const scoreCases = [
  ["correct single answer", question(), [0], true],
  ["incorrect single answer", question(), [1], false],
  ["correct complete response set", multipleQuestion(), [2, 0], true],
  ["partial response set", multipleQuestion(), [0], false],
  ["extra selected response", multipleQuestion(), [0, 1, 2], false],
  ["wrong equal-sized response set", multipleQuestion(), [0, 1], false],
  ["duplicate selected responses", multipleQuestion(), [0, 0, 2], false]
];
for (const [name, item, selected, expected] of scoreCases) {
  test(`scores ${name}`, () => assert.equal(core.isCorrect(item, selected), expected));
}

test("answer permutations preserve original correctness", () => {
  const item = multipleQuestion();
  for (const random of [() => 0, () => 0.5, () => 0.999]) {
    const prepared = core.prepareQuestion(item, random);
    assert.deepEqual(prepared.answers.filter((answer) => answer.correct).map((answer) => answer.originalIndex).sort(), [0, 2]);
  }
});

test("answer shuffling does not mutate the bank", () => {
  const item = question();
  const before = structuredClone(item);
  core.prepareQuestion(item, () => 0);
  assert.deepEqual(item, before);
});

test("question randomization produces a shuffled permutation", () => {
  const ids = ["a", "b", "c", "d"];
  assert.deepEqual(core.shuffle([...ids], () => 0), ["b", "c", "d", "a"]);
});

test("progress survives a storage round trip", () => {
  const storage = memoryStorage();
  core.saveProgress(storage, { totalAttempts: 5, correctCount: 3 });
  assert.deepEqual(core.loadProgress(storage), { totalAttempts: 5, correctCount: 3 });
});

test("invalid stored progress starts empty", () => {
  for (const value of ["bad json", "null", '{"totalAttempts":1,"correctCount":2}', '{"totalAttempts":-1,"correctCount":0}']) {
    assert.deepEqual(core.loadProgress({ getItem: () => value }), core.emptyProgress());
  }
});

test("unavailable storage starts empty", () => {
  assert.deepEqual(core.loadProgress({ getItem() { throw new Error("blocked"); } }), core.emptyProgress());
});

test("storage write failures are reported without throwing", () => {
  assert.equal(core.saveProgress({ setItem() { throw new Error("quota"); } }, core.emptyProgress()), false);
});
