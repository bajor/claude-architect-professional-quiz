"use strict";

// Optional browser verification. Playwright is a development tool, never a runtime dependency.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { ROOT } = require("./load-bank.js");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");

async function localSite() {
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript" };
  const server = http.createServer((request, response) => {
    const name = new URL(request.url, "http://localhost").pathname.slice(1) || "index.html";
    const file = path.join(ROOT, "dist", name);
    if (name.includes("/") || !fs.existsSync(file)) { response.writeHead(404).end(); return; }
    response.setHeader("Content-Type", types[path.extname(name)] || "text/plain");
    fs.createReadStream(file).pipe(response);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { server, url: `http://127.0.0.1:${server.address().port}/` };
}

async function checkBank(page) {
  return page.evaluate(() => {
    const bank = globalThis.CCARP_QUESTIONS;
    const visited = new Set();
    const assertFits = (item, stage) => {
      if (document.documentElement.scrollWidth > innerWidth) throw new Error(`Horizontal overflow: ${item.id}, ${stage}`);
    };
    let shuffled = false;
    for (let index = 0; index < bank.length; index += 1) {
      const item = bank.find((question) => question.prompt === document.getElementById("prompt").textContent);
      if (!item || visited.has(item.id)) throw new Error("Question deck repeats or renders an unknown question.");
      visited.add(item.id);
      assertFits(item, "unanswered");
      const buttons = [...document.querySelectorAll(".answer-button")];
      const displayed = buttons.map((button) => item.answers.findIndex((answer) => answer.text === button.lastChild.textContent));
      if (new Set(displayed).size !== 4 || displayed.includes(-1)) throw new Error(`Invalid displayed options: ${item.id}`);
      shuffled ||= displayed.some((original, position) => original !== position);
      const correct = item.type === "multiple" ? item.correctIndices : [item.correct];
      if (item.type === "multiple") {
        const first = displayed.indexOf(correct[0]);
        buttons[first].click();
        if (!getComputedStyle(buttons[first], "::after").content.includes("Selected")) {
          throw new Error("Selected answer lacks its non-color marker.");
        }
        assertFits(item, "selected");
        if (!document.getElementById("submit-button").disabled) throw new Error("Partial set accepted.");
        buttons[first].click();
        buttons.forEach((button, position) => { if (correct.includes(displayed[position])) button.click(); });
        const wrong = displayed.findIndex((original) => !correct.includes(original));
        buttons[wrong].click();
        if (!document.getElementById("submit-button").disabled) throw new Error("Extra set accepted.");
        buttons[wrong].click();
        document.getElementById("submit-button").click();
      } else buttons[displayed.indexOf(item.correct)].click();
      if (document.getElementById("score").textContent !== `Score: ${index + 1} / ${index + 1}`) {
        throw new Error(`Scoring failed after shuffling: ${item.id}`);
      }
      const explanations = [...document.querySelectorAll(".option-explanation")];
      buttons.forEach((button, position) => {
        if (button.classList.contains("correct") !== correct.includes(displayed[position])) throw new Error(`Highlight mismatch: ${item.id}`);
        if (!explanations[position].textContent.includes(item.answers[displayed[position]].explanation)) throw new Error(`Explanation mismatch: ${item.id}`);
      });
      if (document.querySelector("#question-source a").href !== new URL(item.source.url).href) throw new Error(`Source mismatch: ${item.id}`);
      assertFits(item, "feedback");
      document.getElementById("source-details").open = true;
      assertFits(item, "expanded sources");
      document.getElementById("source-details").open = false;
      document.getElementById("next-button").click();
    }
    if (!shuffled) throw new Error("No answer permutation observed.");
    return { checked: visited.size, formats: [...new Set(bank.map((item) => item.type))] };
  });
}

async function checkKeyboard(page) {
  const seen = new Set();
  const deckSize = await page.evaluate(() => globalThis.CCARP_QUESTIONS.length);
  let attempt = 0;
  while (attempt < deckSize && (attempt < 2 || seen.size < 2)) {
    const selection = await page.evaluate(() => {
      const item = globalThis.CCARP_QUESTIONS.find((q) => q.prompt === document.getElementById("prompt").textContent);
      const correct = item.type === "multiple" ? item.correctIndices : [item.correct];
      const texts = [...document.querySelectorAll(".answer-button")].map((button) => button.lastChild.textContent);
      return { multiple: item.type === "multiple", keys: correct.map((index) => String(texts.indexOf(item.answers[index].text) + 1)) };
    });
    seen.add(selection.multiple);
    for (const key of selection.keys) await page.keyboard.press(key);
    if (selection.multiple) {
      const prompt = await page.locator("#prompt").textContent();
      await page.keyboard.down("Enter");
      await page.keyboard.down("Enter");
      await page.keyboard.up("Enter");
      assert.equal(await page.locator("#prompt").textContent(), prompt, "Held Enter skipped feedback.");
      assert.equal(await page.locator("#explanations").isVisible(), true);
    }
    assert.equal(await page.locator("#score").textContent(), `Score: ${attempt + 1} / ${attempt + 1}`);
    await page.keyboard.press("Enter");
    attempt += 1;
  }
  assert.equal(seen.size, 2, "Keyboard traversal did not encounter both question formats within one deck.");
  return attempt;
}

async function checkNativeButtons(page, previousAttempts) {
  await page.locator(".answer-button").first().focus();
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement === document.querySelectorAll(".answer-button")[1]), true);
  const selection = await page.evaluate(() => {
    const item = globalThis.CCARP_QUESTIONS.find((q) => q.prompt === document.getElementById("prompt").textContent);
    const correct = item.type === "multiple" ? item.correctIndices : [item.correct];
    const texts = [...document.querySelectorAll(".answer-button")].map((button) => button.lastChild.textContent);
    return { multiple: item.type === "multiple", positions: correct.map((index) => texts.indexOf(item.answers[index].text)) };
  });
  for (const position of selection.positions) {
    await page.locator(".answer-button").nth(position).focus();
    await page.keyboard.press("Space");
  }
  if (selection.multiple) {
    await page.locator("#submit-button").focus();
    await page.keyboard.press("Enter");
  }
  assert.equal(await page.locator("#score").textContent(), `Score: ${previousAttempts + 1} / ${previousAttempts + 1}`);
}

async function main() {
  const local = process.env.QUIZ_URL ? null : await localSite();
  const url = process.env.QUIZ_URL || local.url;
  const browser = await chromium.launch({ headless: true });
  const output = process.env.SMOKE_OUTPUT || "/tmp/opencode";
  fs.mkdirSync(output, { recursive: true });
  try {
    for (const [name, viewport] of [["desktop", { width: 1280, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
      const page = await browser.newPage({ viewport });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(url);
      await page.locator(".answer-button").first().waitFor();
      assert.equal(await page.locator("#explanations").isVisible(), false);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.screenshot({ path: path.join(output, `ccarp-${name}.png`), fullPage: true });
      const result = await checkBank(page);
      await page.reload();
      await page.locator(".answer-button").first().waitFor();
      await page.emulateMedia({ forcedColors: "active" });
      const forcedColorsResult = await checkBank(page);
      await page.emulateMedia({ forcedColors: "none" });
      await page.reload();
      await page.locator(".answer-button").first().waitFor();
      const saved = result.checked + forcedColorsResult.checked;
      assert.match(await page.locator("#bank-status").textContent(), new RegExp(`Saved: ${saved} correct / ${saved} attempts`));
      const keyboardAttempts = await checkKeyboard(page);
      await checkNativeButtons(page, keyboardAttempts);
      page.once("dialog", (dialog) => dialog.accept());
      await page.locator("#reset-button").click();
      assert.match(await page.locator("#bank-status").textContent(), /Saved: 0 correct \/ 0 attempts/);
      assert.deepEqual(errors, []);
      console.log(`${name}: ${result.checked} questions, ${result.formats.join("/")}, shuffling, explanations, sources, forced-colors selection, keyboard, held Enter, persistence, reset, no overflow or JS errors.`);
      await page.close();
    }
  } finally {
    await browser.close();
    if (local) await new Promise((resolve) => local.server.close(resolve));
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
