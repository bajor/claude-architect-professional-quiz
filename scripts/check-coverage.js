"use strict";

const { loadBank, validateBank } = require("./load-bank.js");
const MINIMUM_QUESTIONS = 190;
const MINIMUM_PER_OBJECTIVE = 5;

function getCoverage(questions) {
  const { domains, objectives } = globalThis.CCARP_BLUEPRINT;
  const count = (predicate) => questions.filter(predicate).length;
  const percent = (amount) => questions.length ? Number((100 * amount / questions.length).toFixed(2)) : 0;
  return {
    total: questions.length,
    domains: domains.map((domain) => {
      const amount = count((question) => question.domain === domain.id);
      return { id: domain.id, name: domain.name, count: amount, percent: percent(amount), officialWeight: domain.weight };
    }),
    objectives: Object.keys(objectives).map((id) => ({ id, count: count((question) => question.objectiveId === id) })),
    difficulty: Object.fromEntries(["foundational", "intermediate", "advanced"].map((level) => {
      const amount = count((question) => question.difficulty === level);
      return [level, { count: amount, percent: percent(amount) }];
    })),
    formats: Object.fromEntries(["single", "multiple"].map((type) => {
      const amount = count((question) => question.type === type);
      return [type, { count: amount, percent: percent(amount) }];
    }))
  };
}

function assertCoverage(questions) {
  const report = getCoverage(questions);
  const insufficient = report.objectives.filter((objective) => objective.count < MINIMUM_PER_OBJECTIVE);
  const errors = [];
  if (report.total < MINIMUM_QUESTIONS) errors.push(`Bank needs at least ${MINIMUM_QUESTIONS} questions; found ${report.total}.`);
  if (insufficient.length) errors.push(`Objectives below ${MINIMUM_PER_OBJECTIVE}: ${insufficient.map((item) => `${item.id} (${item.count})`).join(", ")}`);
  if (errors.length) throw new Error(errors.join("\n"));
  return report;
}

if (require.main === module) {
  const questions = validateBank(loadBank());
  const report = getCoverage(questions);
  if (process.argv.includes("--json")) console.log(JSON.stringify(report, null, 2));
  else {
    console.log(`Total questions: ${report.total}`);
    console.table(report.domains);
    console.table(report.objectives);
    console.table(report.difficulty);
    console.table(report.formats);
  }
  assertCoverage(questions);
  console.log("Coverage validation passed: every objective has at least five questions.");
}

module.exports = { getCoverage, assertCoverage };
