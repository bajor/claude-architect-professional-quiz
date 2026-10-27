# Claude Architect Professional Quiz

[Open the quiz](https://bajor.github.io/claude-architect-professional-quiz/) · [CI](https://github.com/bajor/claude-architect-professional-quiz/actions/workflows/ci.yml) · [Documentation](docs/index.md)

An independent practice quiz for **Claude Certified Architect – Professional (CCAR-P)**:
228 original, source-attributed questions covering all 38 objectives of the official
Version 1.0 exam guide, effective July 2026 and verified on October 26, 2026 UTC.
This is the **Professional** blueprint, not Architect Foundations.

The dependency-free HTML/CSS/JavaScript interface preserves the layout, typography,
colors, cards, answer highlighting, and interaction model of
[bajor/gcp-ml-quiz](https://github.com/bajor/gcp-ml-quiz). That repository is unchanged.
No backend, API key, sign-in, analytics, or runtime network service is required.

## Certification scope and coverage

| Domain | Official weight | Practice questions |
| --- | ---: | ---: |
| Solution Design & Architecture | 17% | 39 |
| Claude Models, Prompting & Context Engineering | 13% | 30 |
| Integration | 19% | 43 |
| Evaluation, Testing & Optimization | 16% | 36 |
| Governance, Safety & Risk Management | 14% | 32 |
| Stakeholder Communication & Lifecycle Management | 14% | 32 |
| Developer Productivity & Operational Enablement | 7% | 16 |
| **Total** | **100%** | **228** |

Every objective has **5–7 questions**. IDs such as `3.2` are project-assigned ordinal
labels for the guide's unnumbered bullets, not official objective numbers.
[Complete blueprint and PDF provenance](docs/exam-blueprint.md).

- **Difficulty:** 34 foundational (14.91%), 80 intermediate (35.09%), 114 advanced (50%).
- **Formats:** 165 single-answer and 63 multiple-response (27.63%). Exactly four options each.
- **Evidence:** every option has its own explanation; every question exposes a primary
  documentation link, supplementary references, verification date, and exam objective.
- **Method:** author by objective in small batches, verify mechanisms in primary
  documentation, then independently review keys, distractors, ambiguity, and source relevance.
  Scenarios test constraints and trade-offs, not memorization of mutable model prices.

Difficulty labels are author judgments, not psychometrically calibrated levels. The guide
does not publish a multiple-response percentage; this bank's mix is a practice target.
This is continuous practice, not a timed 63-item exam simulation.

## Using the quiz

1. Select an answer with a click or keys **1–4**. Single-answer questions score immediately.
2. For multiple-response items, toggle the stated number of choices, then select
   **Submit answers** or press **Enter**. A partial or extra selection cannot submit.
   Only the exact complete answer set earns a correct result.
3. Review the correct/incorrect highlighting and explanations for all four options.
   Source details contain the supporting references and objective statement.
4. Select **Next** or press **Enter**. Questions and answers are independently shuffled;
   original answer indices preserve correctness after shuffling. Tab and Space also work.
5. **Reset progress** clears session and saved totals after confirmation.

The score is for the current page session. Lifetime attempt/correct totals are saved
only in this browser and shown below the card. Reloading starts a new shuffled deck;
the active question and partial selections are not restored. If storage is blocked,
practice still works and the footer reports that totals cannot be saved.

## Authoritative sources

- [Official certification page](https://anthropic-partners.skilljar.com/claude-certified-architect-professional-certification)
- [Official CCAR-P Exam Guide PDF](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542810%2FClaude+Certified+Architect+%E2%80%93+Professional+Exam+Guide.pdf)
- [Anthropic Claude Platform documentation](https://platform.claude.com/docs/en/)
- [Claude Code documentation](https://code.claude.com/docs/en/)
- [Official Model Context Protocol specification](https://modelcontextprotocol.io/specification/2026-07-28)

The [74-record source registry](docs/sources.md) also includes official NIST AI risk
guidance, GDPR legislation, HHS HIPAA guidance, FedRAMP guidance, A2A documentation,
Google SRE practice guidance, and primary evaluation/security/project references where
they support a blueprint objective. Technical evidence was checked on October 26–27, 2026 UTC.
The [research log](docs/research-log.md) records version changes, contradictions,
vendor evidence limitations, and secondary retrieval used for two legal sources in
the original research. The latest HTTP snapshot needed a proxy only for EUR-Lex.
The exam PDF itself was retrieved directly, without a mirror.
The optional `node scripts/verify-sources.js` maintenance command refreshes a separate
HTTP retrieval ledger; it is not a semantic evidence check or a network requirement in CI.

## Local development

Use **Node.js 22 or later** for tooling. There are no npm dependencies to install.

```sh
node scripts/validate-question-bank.js
node scripts/check-coverage.js
npm test
npm run build
npm run check
```

`npm run validate` also rejects stale generated `questions.js`. Rebuild after changing
authoring data. The build writes the browser bank and only seven static assets plus
`.nojekyll` into `dist/`; research files, tests, Git metadata, and source JSON are not deployed.

Open the checked-in `index.html` directly, or use a local server for consistent storage:

```sh
python3 -m http.server 8000 --directory dist
```

Visit `http://localhost:8000/`. No Anthropic credential is used.

Optional real-browser verification uses an independently installed Playwright package:

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright node scripts/smoke-test.js
QUIZ_URL=https://bajor.github.io/claude-architect-professional-quiz/ PLAYWRIGHT_MODULE=/absolute/path/to/playwright node scripts/smoke-test.js
```

The smoke test checks every question at desktop and mobile sizes in ordinary and
forced-colors modes, including expanded sources and overflow. It also checks keyboard
operation, held Enter, persistence, and reset. Playwright is not a project or runtime dependency.

## Contributing questions

1. Read the exact objective in `blueprint.js` and the [authoring contract](docs/question-authoring.md).
2. Add original records to `data/questions/<objectiveId>.json`. Keep original indices
   in `correct` for single-answer or a distinct `correctIndices` array for multiple-response.
3. Use source IDs from `data/sources/*.json`, after checking the actual primary evidence.
   New source records need a verified URL, section, version, access date, and evidence notes.
4. Validate the batch, rebuild, and run `npm run check`. CI rejects invalid metadata,
   duplicate/near-identical prompts, a bank below 190 items, or any objective below five.
5. Obtain independent review of every option, the exact keyed set, and evidence relevance.

Near-identical prompt detection uses normalized token-set Jaccard similarity of at least
0.86. It supplements, but cannot replace, human/independent semantic-duplication review.

## CI and deployment

`ci.yml` validates schema, generated data, coverage, tests, and the static build on pull
requests and main pushes. `deploy.yml` reuses the complete CI gate before building and
publishing `dist/` through official GitHub Pages Actions. No deployment branch is used.
Actions are pinned to verified release commit SHAs. CI, gated Pages publication, and
live desktop/mobile browser checks succeeded on **October 27, 2026 UTC**. See
[verification](docs/verification.md) for workflow links, snapshot identity, and review limitations.

## Disclaimer and license

Unofficial practice questions. Not affiliated with or endorsed by Anthropic.
The questions are original independent study material, not official examination
questions, exam dumps, or recalled confidential exam content. No practice score
guarantees exam success. The official passing standard is **scaled 720 on a 100–1,000
scale**, not a published 72% raw-correctness threshold.

[MIT license](LICENSE) covers the application and original practice material. Linked
documentation, quoted objective statements, and trademarks retain their owners' rights.
