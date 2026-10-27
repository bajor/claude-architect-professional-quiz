"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { ROOT, validateBank, browserBank } = require("./load-bank.js");

const questions = validateBank();
if (process.argv.includes("--check-generated")) {
  const file = path.join(ROOT, "questions.js");
  if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== browserBank(questions)) {
    throw new Error("questions.js is stale or missing. Run node scripts/build.js.");
  }
}
console.log(`Question bank validation passed for ${questions.length} questions.`);
