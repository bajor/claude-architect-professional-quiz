"use strict";

// Integration tests execute the real app against an in-memory DOM/event adapter, without browser dependencies.
const assert = require("node:assert/strict");
const test = require("node:test");
const { question, multipleQuestion } = require("./fixtures.js");
const { createHarness } = require("./app-harness.js");

test("app integration: a correct single answer increments the visible score", () => {
  const app = createHarness([question()]);
  app.answer(0);
  assert.equal(app.get("score").textContent, "Score: 1 / 1");
});

test("app integration: an incorrect single answer is scored once", () => {
  const app = createHarness([question()]);
  app.answer(1);
  app.answer(0);
  assert.equal(app.get("score").textContent, "Score: 0 / 1");
});

test("app integration: complete multiple selection requires explicit submission", () => {
  const app = createHarness([multipleQuestion()], { random: () => 0 });
  app.answer(1);
  app.answer(3);
  assert.equal(app.get("score").textContent, "Score: 0 / 0");
  app.get("submit-button").click();
  assert.equal(app.get("score").textContent, "Score: 1 / 1");
});

test("app integration: partial selections cannot submit", () => {
  const app = createHarness([multipleQuestion()]);
  app.answer(0);
  app.key("Enter");
  assert.equal(app.get("score").textContent, "Score: 0 / 0");
});

test("app integration: extra selections disable submission", () => {
  const app = createHarness([multipleQuestion()]);
  app.answer(0);
  app.answer(2);
  app.answer(3);
  assert.equal(app.get("submit-button").disabled, true);
});

test("app integration: a wrong equal-sized selection is incorrect", () => {
  const app = createHarness([multipleQuestion()]);
  app.answer(0);
  app.answer(1);
  app.get("submit-button").click();
  assert.equal(app.get("score").textContent, "Score: 0 / 1");
});

test("app integration: response buttons expose their toggle state", () => {
  const app = createHarness([multipleQuestion()]);
  app.answer(1);
  assert.equal(app.get("answers").children[1].getAttribute("aria-pressed"), "true");
  app.answer(1);
  assert.equal(app.get("answers").children[1].getAttribute("aria-pressed"), "false");
});

test("app integration: shuffled answer positions still score by original index", () => {
  const app = createHarness([question()], { random: () => 0 });
  app.answer(3);
  assert.equal(app.get("score").textContent, "Score: 1 / 1");
});

test("app integration: a new multiple-response item starts with an empty selection", () => {
  const next = multipleQuestion({ id: "next", prompt: "A privileged execution requires two separate approvals under a new operations policy. Select 2 answers." });
  const app = createHarness([multipleQuestion(), next]);
  app.answer(0);
  app.answer(2);
  app.get("submit-button").click();
  app.get("next-button").click();
  assert.match(app.get("selection-status").textContent, /Selected 0 \/ 2/);
});

test("app integration: held Enter cancels native activation", () => {
  const next = multipleQuestion({ id: "next", prompt: "A deployment requires separate platform and legal approvals before the next operation. Select 2 answers." });
  const app = createHarness([multipleQuestion(), next]);
  app.answer(0);
  app.answer(2);
  app.get("submit-button").click();
  assert.equal(app.key("Enter", { repeat: true }), true);
});

test("app integration: revealed explanations follow displayed answer order", () => {
  const item = question();
  const app = createHarness([item], { random: () => 0 });
  app.answer(0);
  const explanations = app.get("explanations");
  assert.equal(explanations.hidden, false);
  assert.equal(explanations.children.length, 4);
  assert.ok(explanations.children[0].textContent.includes(item.answers[1].explanation));
});

test("app integration: highlighting reveals missed correct options", () => {
  const app = createHarness([multipleQuestion()]);
  app.answer(0);
  app.answer(1);
  app.get("submit-button").click();
  const answers = app.get("answers").children;
  assert.equal(answers[1].classList.contains("incorrect"), true);
  assert.equal(answers[2].classList.contains("correct"), true);
});

test("app integration: source details render verified links", () => {
  const item = question();
  const app = createHarness([item]);
  const link = app.get("question-source").children[1];
  assert.equal(link.href, item.source.url);
  assert.equal(link.rel, "noopener noreferrer");
  assert.ok(app.get("source-references").textContent.includes(item.source.accessedAt));
});

test("app integration: saved lifetime totals survive a reload", () => {
  const app = createHarness([question()]);
  app.answer(0);
  const reloaded = createHarness([question()], { storage: app.storage });
  assert.match(reloaded.get("bank-status").textContent, /Saved: 1 correct \/ 1 attempts/);
});

test("app integration: confirmed reset clears saved totals", () => {
  const app = createHarness([question()]);
  app.answer(0);
  app.get("reset-button").click();
  assert.match(app.get("bank-status").textContent, /Saved: 0 correct \/ 0 attempts/);
});

test("app integration: cancelled reset preserves progress", () => {
  const app = createHarness([question()], { confirm: false });
  app.answer(0);
  app.get("reset-button").click();
  assert.equal(app.get("score").textContent, "Score: 1 / 1");
});

test("app integration: keyboard selection works after Next retains focus", () => {
  const second = question({ id: "second", prompt: "A separate scenario has distinct requirements for a different business operation." });
  const app = createHarness([question(), second]);
  app.key("1");
  app.key("Enter");
  app.key("1");
  assert.equal(app.get("score").textContent, "Score: 2 / 2");
});

test("app integration: Enter submits an exact multiple-response selection", () => {
  const app = createHarness([multipleQuestion()]);
  app.key("1");
  app.key("3");
  app.key("Enter");
  assert.equal(app.get("score").textContent, "Score: 1 / 1");
});

test("app integration: unavailable storage does not interrupt scoring", () => {
  const storage = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
  const app = createHarness([question()], { storage });
  app.answer(0);
  assert.match(app.get("bank-status").textContent, /storage is unavailable/);
  assert.equal(app.get("score").textContent, "Score: 1 / 1");
});

test("app integration: blocked storage is reported before the first answer", () => {
  const storage = { getItem() { return null; }, setItem() { throw new Error("blocked"); } };
  const app = createHarness([question()], { storage });
  assert.match(app.get("bank-status").textContent, /storage is unavailable/);
});

test("app integration: invalid data prevents quiz interaction", () => {
  const app = createHarness([question({ correct: 9 })]);
  assert.equal(app.get("quiz-panel").hidden, true);
});
