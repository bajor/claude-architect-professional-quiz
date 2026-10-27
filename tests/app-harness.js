"use strict";

// Minimal event/DOM adapter for app integration tests. Real browser checks live in scripts/smoke-test.js.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { memoryStorage } = require("./fixtures.js");
const ROOT = path.resolve(__dirname, "..");
const scripts = ["blueprint.js", "question-schema.js", "quiz-core.js", "app.js"].map((name) =>
  [name, fs.readFileSync(path.join(ROOT, name), "utf8")]
);

class Element {
  constructor(tag, document) {
    this.tag = tag;
    this.document = document;
    this.children = [];
    this.attributes = {};
    this.listeners = {};
    this.dataset = {};
    this.disabled = false;
    this.hidden = false;
    this.classes = new Set();
    this.classList = { add: (value) => this.classes.add(value), contains: (value) => this.classes.has(value) };
  }
  set textContent(value) { this.children = [String(value)]; }
  get textContent() { return this.children.map((child) => typeof child === "string" ? child : child.textContent).join(""); }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = [...children]; }
  setAttribute(name, value) { this.attributes[name] = value; }
  getAttribute(name) { return this.attributes[name] ?? null; }
  addEventListener(name, listener) { this.listeners[name] = listener; }
  click() { if (!this.disabled) this.listeners.click?.({ target: this }); }
  focus() { this.document.activeElement = this; }
  matches(selector) { return selector.split(",").some((name) => name.trim() === this.tag); }
}

function createHarness(questions, options = {}) {
  const elements = new Map();
  const listeners = {};
  const document = {
    activeElement: null,
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, new Element(id.endsWith("button") ? "button" : "div", document));
      return elements.get(id);
    },
    createElement: (tag) => new Element(tag, document),
    addEventListener: (name, listener) => { listeners[name] = listener; }
  };
  const storage = options.storage || memoryStorage();
  const math = Object.create(Math);
  math.random = options.random || (() => 0.999);
  const context = vm.createContext({ document, localStorage: storage, Math: math, URL,
    console: { error() {} }, confirm: () => options.confirm !== false, CCARP_QUESTIONS: structuredClone(questions) });
  for (const [name, code] of scripts) vm.runInContext(code, context, { filename: name });
  return {
    get: (id) => document.getElementById(id), storage,
    answer: (index) => document.getElementById("answers").children[index].click(),
    key(key, overrides = {}) {
      let prevented = false;
      listeners.keydown({ key, target: document.activeElement || new Element("body", document),
        preventDefault() { prevented = true; }, ...overrides });
      return prevented;
    }
  };
}

module.exports = { createHarness };
