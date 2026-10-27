"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const { assertCoverage } = require("../scripts/check-coverage.js");

function minimumBank() {
  return Object.keys(globalThis.CCARP_BLUEPRINT.objectives).flatMap((objectiveId) =>
    Array.from({ length: 5 }, () => ({ objectiveId, domain: Number(objectiveId[0]), difficulty: "advanced", type: "single" }))
  );
}

test("coverage rejects a bank below 190 questions", () => {
  assert.throws(() => assertCoverage(minimumBank().slice(1)), /at least 190/);
});

test("coverage rejects an underrepresented objective even at 190 questions", () => {
  const items = minimumBank();
  items[0] = { ...items.at(-1) };
  assert.throws(() => assertCoverage(items), /1\.1 \(4\)/);
});

test("coverage accepts five questions for each of the 38 objectives", () => {
  assert.equal(assertCoverage(minimumBank()).total, 190);
});
