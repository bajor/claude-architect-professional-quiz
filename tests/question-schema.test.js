"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const { question, multipleQuestion } = require("./fixtures.js");
require("../question-schema.js");
const { validateQuestionBank } = globalThis.CCARP_SCHEMA;

test("accepts complete single-answer metadata", () => {
  assert.deepEqual(validateQuestionBank([question()]), []);
});

test("accepts multiple-response metadata", () => {
  assert.deepEqual(validateQuestionBank([multipleQuestion()]), []);
});

const invalid = [
  ["missing IDs", (q) => { delete q.id; }, /non-empty id/],
  ["missing prompts", (q) => { delete q.prompt; }, /non-empty prompt/],
  ["non-string multiple prompts", (q) => { Object.assign(q, multipleQuestion(), { prompt: 2 }); delete q.correct; }, /non-empty prompt/],
  ["incorrect option counts", (q) => q.answers.pop(), /exactly 4/],
  ["duplicate options", (q) => { q.answers[1].text = ` ${q.answers[0].text.toUpperCase()} `; }, /duplicate answer/],
  ["missing explanations", (q) => { q.answers[1].explanation = ""; }, /explain every/],
  ["invalid correct indices", (q) => { q.correct = 4; }, /invalid single-answer/],
  ["fractional correct indices", (q) => { q.correct = 0.5; }, /invalid single-answer/],
  ["unknown domains", (q) => { q.domain = 8; }, /unknown domain/],
  ["unknown objectives", (q) => { q.objectiveId = "2.9"; }, /unknown objective/],
  ["mismatched domain mapping", (q) => { q.domain = 1; }, /does not match/],
  ["invalid difficulty", (q) => { q.difficulty = "expert"; }, /invalid difficulty/],
  ["missing tags", (q) => { delete q.tags; }, /non-empty tag/],
  ["missing source", (q) => { q.source = null; }, /source metadata/],
  ["invalid source URL", (q) => { q.source.url = "javascript:alert(1)"; }, /valid HTTP/],
  ["embedded URL credentials", (q) => { q.source.url = "https://user:password@example.com/"; }, /without credentials/],
  ["impossible access dates", (q) => { q.source.accessedAt = "2026-02-30"; }, /valid YYYY/],
  ["missing source version", (q) => { delete q.source.version; }, /source version/],
  ["missing reference metadata", (q) => { q.references = []; }, /exam-guide references/],
  ["missing official guide", (q) => { q.references = [{ ...q.source }]; }, /official exam guide/],
  ["unknown question formats", (q) => { q.type = "true-false"; }, /invalid question type/]
];

for (const [name, mutate, message] of invalid) {
  test(`rejects ${name}`, () => {
    const item = question();
    mutate(item);
    assert.match(validateQuestionBank([item]).join("\n"), message);
  });
}

for (const indices of [[], [0], [0, 0], [0, 4], [0, 0.5], [0, 1, 2, 3], null]) {
  test(`rejects invalid multiple-response set ${JSON.stringify(indices)}`, () => {
    const item = multipleQuestion();
    item.correctIndices = indices;
    assert.match(validateQuestionBank([item]).join("\n"), /invalid multiple-response/);
  });
}

test("rejects mixed answer formats", () => {
  const item = multipleQuestion();
  item.correct = 0;
  assert.match(validateQuestionBank([item]).join("\n"), /invalid multiple-response/);
});

test("rejects an unstated response count", () => {
  const item = multipleQuestion({ prompt: "Select all suitable answers." });
  assert.match(validateQuestionBank([item]).join("\n"), /selection count/);
});

test("rejects duplicate IDs", () => {
  assert.match(validateQuestionBank([question(), question({ prompt: "A distinct task tests a separate mechanism." })]).join("\n"), /Duplicate question id/);
});

test("rejects normalized duplicate prompts", () => {
  const item = question();
  assert.match(validateQuestionBank([item, question({ id: "other", prompt: item.prompt.toUpperCase() })]).join("\n"), /duplicate prompt/);
});

test("rejects near-identical prompts", () => {
  const item = question();
  assert.match(validateQuestionBank([item, question({ id: "other", prompt: item.prompt.replace("service", "application") })]).join("\n"), /near-identical/);
});

test("reports malformed records without throwing", () => {
  assert.match(validateQuestionBank([null, [], false]).join("\n"), /must be an object/);
});
