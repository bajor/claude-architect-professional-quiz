---
type: Guide
title: Question authoring contract
---

# Question authoring

This bank contains original practice material, not recalled exam items. The official
blueprint governs scope; technical primary sources support mechanisms and trade-offs.
Objective IDs are project-assigned ordinal labels for the guide's unnumbered bullets.

## Authoring data

Add records to `data/questions/<objectiveId>.json`, an array per objective. Each record has:

- `id`: unique stable `ccarp-<objectiveId>-<short-decision-slug>`.
- `domain`: integer 1 through 7; `objectiveId`: matching key from `blueprint.js`.
- `difficulty`: `foundational`, `intermediate`, or `advanced`.
- `type`: `single` or `multiple`.
- `prompt`: self-contained English scenario with the decisive constraints.
- `answers`: exactly four `{ "text": "…", "explanation": "…" }` objects.
- For `single`, `correct`: original answer index 0 through 3. No `correctIndices`.
- For `multiple`, `correctIndices`: two or three distinct original indices. No `correct`.
  The prompt must explicitly contain `Select 2 answers.` or `Select 3 answers.`
- `tags`: at least one useful lowercase topic tag.
- `sourceIds`: one or more IDs from `data/sources/*.json`, primary source first.

The deterministic build resolves source IDs into a full visible `source` and supplementary
`references`, including the official exam guide. Do not manually edit generated `questions.js`.

## Quality gate

1. Read the exact objective and source evidence before writing a manageable batch.
2. Identify a distinct decision or failure mechanism for each item. Changing only an
   industry name, number, or wording does not make a new question.
3. Supply the constraints that make one answer set unambiguous. Four plausible options
   must address the same decision; avoid grammatical clues and absurd distractors.
4. Independently justify each option in one or two specific sentences. Explanations must
   name the mechanism or violated constraint, not merely say correct or incorrect.
5. Evaluate multiple-response options independently. State the exact selection count;
   partial credit is not awarded. Do not include a defensible unkeyed option.
6. Distinguish documented features from an architect's inference under stated constraints.
   A source must support the tested distinction, not just mention the general topic.
7. Avoid volatile prices, model names, numeric limits, and defaults. Explicitly scope
   protocol/API version-dependent questions. Never generalize legacy MCP behavior.
8. Check the batch with `node scripts/validate-question-bank.js`, then inspect coverage
   with `node scripts/check-coverage.js`. Independent review must check source relevance,
   ambiguity, repetitions, technical correctness, and answer explanations.

## Target allocation

228 items: domains 1–7 contain 39, 30, 43, 36, 32, 32, and 16 respectively.
Every objective has at least five. Aim for 34 foundational, 80 intermediate, and 114
advanced items, with 63 multiple-response items. Coverage validation enforces the
minimums; the distribution targets are authoring guidance, not exam predictions.

Accept a contribution only when schema, source attribution, coverage, tests, and build
pass, and a reviewer can defend exactly the keyed set against the stated constraints.

# References

1. ANTHROPIC. Official CCAR-P exam guide. See [exam blueprint](exam-blueprint.md).
2. Technical evidence and verification caveats: [source registry](sources.md) and [research log](research-log.md).
