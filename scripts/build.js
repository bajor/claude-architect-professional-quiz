"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { ROOT, validateBank, browserBank } = require("./load-bank.js");
const { assertCoverage } = require("./check-coverage.js");

const ASSETS = ["index.html", "style.css", "blueprint.js", "question-schema.js", "quiz-core.js", "questions.js", "app.js"];
const questions = validateBank();
assertCoverage(questions);
fs.writeFileSync(path.join(ROOT, "questions.js"), browserBank(questions));
const output = path.join(ROOT, "dist");
fs.mkdirSync(output, { recursive: true });
for (const name of fs.readdirSync(output)) {
  if (!ASSETS.includes(name) && name !== ".nojekyll") {
    throw new Error(`Unexpected dist entry: ${name}. Remove it explicitly before building.`);
  }
}
for (const name of ASSETS) fs.copyFileSync(path.join(ROOT, name), path.join(output, name));
fs.writeFileSync(path.join(output, ".nojekyll"), "");
console.log(`Built ${ASSETS.length} static assets and .nojekyll for ${questions.length} questions into dist/.`);
