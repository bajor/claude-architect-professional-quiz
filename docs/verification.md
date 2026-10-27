---
type: Verification
title: Release verification
timestamp: "2026-10-27"
status: workflow-followup
---

# Release verification

## Scope and accepted local snapshot

The bank has **228 questions and 912 individually explained options**, covering all
38 objectives across seven domains. Every objective has five to seven items. There
are **165 single-answer and 63 multiple-response** questions. Observed domain counts
match the allocation in the [blueprint](exam-blueprint.md); difficulty counts are
34 foundational, 80 intermediate, and 114 advanced.

Final independent engineering acceptance on **2026-10-27 UTC** identified the exact
question, source, runtime, workflow, test, and tooling bytes with SHA-256. The coordinator
compared every file with that manifest after the original reviewed build; all matched.
The later workflow-only pin update is qualified separately below. It changes neither
question/source inputs nor runtime assets. Publication does not extend acceptance to
later content or runtime edits.

```text
Independent manifest SHA-256:
de23d3eec19c776582c08835f985fb2c54bd94a209e3b68fed6b00075c629267
Question/source input manifest SHA-256:
407f0e73976285f7e431cd973109b6b2d3e31b5d26e3af533bbf027e38198fc2
```

The input manifest uses sorted relative paths under `data/questions/` and
`data/sources/`. Each UTF-8 line contains the file's SHA-256, two ASCII spaces, its
relative path, and LF. The generated bank is deterministic from those inputs and
`blueprint.js`.

## Executed local checks

| Instrument | Observed result |
| --- | --- |
| `npm run check` | Schema/source validity, generated-bank freshness, coverage, 74 tests, and static build passed |
| Schema and duplicate checks | Four options, all explanations, source metadata, exact response formats, unique IDs, normalized/near-identical prompts accepted |
| Coverage gate | 228 total; every one of 38 objectives at least five; minimum allowed total is 190 |
| Automated tests | 53 unit and 21 app-integration tests passed; no skips or failures |
| `node --check` | All application, generated-data, tooling, and test JavaScript passed |
| `actionlint` 1.7.12 | Both Actions workflows passed without findings |
| Living Docs lint | Seven concept docs passed frontmatter, indexing, and offline link checks using yq 4.54.1 and lychee 0.24.2 |
| Source HTTP snapshot | 71/71 URLs retrieved, including the guide; one explicitly marked secondary retrieval |
| Static allowlist | Local build: seven application assets plus `.nojekyll`; official Pages archive: seven runtime assets only; no research, tests, source JSON, Git metadata, or credentials |

The application is plain JavaScript, so there is no separate TypeScript compiler gate.
Playwright and the documentation/workflow linters were external verification tools,
not application dependencies. HTTP retrieval is not a semantic source-relevance test;
see the [retrieval ledger](source-verification.json) and [research qualifications](research-log.md).

## Independent content review

Independent AI review sessions assessed every original prompt, all four options and
explanations, the exact keyed set, objective alignment, and supporting primary evidence.
Follow-ups examined changed records rather than accepting the author's corrections
without inspection. All current answer sets were retained after the corrections below.

| Domains | Initial coverage | Follow-up result |
| --- | ---: | --- |
| 1–2 | 69 questions / 276 options | Length clues reduced; repeated scenarios replaced; cache-minimum premise repaired; M1–M4 closed |
| 3 | 43 / 172 | Repeated retrieval decision replaced with final-context selection; F1 closed |
| 4 | 36 / 144 | Move end-state and metric units corrected; five repeated decisions replaced; six specific primary sources added; all 12 revised keys confirmed; F1–F5 closed |
| 5–6 | 64 / 256 | Approval/replay contract, peak review capacity, uncertain-effect recovery, permit explanation, and option wording corrected; no remaining high/medium findings |
| 7 | 16 / 64 | All keys and explanations accepted against 11 fetched official pages; no substantive findings |

Reports and exact review manifests are retained locally in
`/home/ubuntu/research_notes/CCAR Professional evidence/`: `review-domain-*.md`, their
`*-followup.md` records, and `engineering-review-final.md`. These are independent
OpenCode/GPT-6.1 Sol reviews, not official certification validation or human expert review.

## Browser and engineering acceptance

Final local verification used **Node.js 22.22.2, npm 10.9.7, Playwright 1.64.1, and
Chromium 156.0.8078.4 on Linux**. All 228 questions passed at **1280×900** and **390×844**
in ordinary and forced-colors modes. Checks covered answer permutations, exact-set
scoring, partial/extra selections, every explanation, source association, expanded
sources, numeric shortcuts, native Tab/Space/Enter, persistence, reset, and page errors.

The independent probe performed **3,240 rendered-state checks with zero overflow**,
without injected CSS. It additionally checked complete selection states. All four
engineering findings were accepted as fixed:

1. Repeated Enter cancels native activation so focus moving to Next cannot skip feedback.
2. A non-color `[Selected]` marker remains visible in forced-colors mode without focus.
3. Read/write/remove storage probing reports unavailable persistence before answering.
4. Long identifiers wrap throughout the quiz panel on mobile, including explanations.

The keyboard smoke traversal is bounded by the deck size and fails explicitly if it
does not encounter both formats. Test-minimality review found no redundant tests or
tests to split. App tests are explicitly integration tests, not mislabeled isolated units.

The original `bajor/gcp-ml-quiz` remains clean at
`9c38f0c026487fe29e009a5c147a2fcf3cc5f475`; its remote HEAD is unchanged. All original
CSS declarations are retained. [Architecture](architecture.md) records the baseline
and the small functional extensions.

## Remote CI and deployment

Repository: [bajor/claude-architect-professional-quiz](https://github.com/bajor/claude-architect-professional-quiz).
GitHub confirms it is public, is not a fork, uses `main`, and permits rebase merging
only. Pages uses `build_type=workflow`, with HTTPS enforced.

The tested application revision is
[`24979ce0f0ece664af11873c85ae988386c081a4`](https://github.com/bajor/claude-architect-professional-quiz/commit/24979ce0f0ece664af11873c85ae988386c081a4).
The following release slices update documentation only. A subsequent workflow-only
follow-up updates three Pages Action pins, not question, source, test, or runtime bytes.

| Remote observation | Evidence |
| --- | --- |
| Workflow PR validation | [PR #30 CI passed](https://github.com/bajor/claude-architect-professional-quiz/actions/runs/40464173288) |
| Main validation | [CI passed](https://github.com/bajor/claude-architect-professional-quiz/actions/runs/40464382976) |
| Gated publication | [Pages validation, build, and deployment passed](https://github.com/bajor/claude-architect-professional-quiz/actions/runs/40464382997), completed 2026-10-27 07:00:04 UTC |
| Documentation-only release candidate | Revision `dc22a21505713c05776ae07ef5c4c59776d59715` passed [CI](https://github.com/bajor/claude-architect-professional-quiz/actions/runs/40465206044) and [Pages](https://github.com/bajor/claude-architect-professional-quiz/actions/runs/40465206123); reviewed application bytes remain unchanged |
| Public website | [Live quiz](https://bajor.github.io/claude-architect-professional-quiz/); HTTP 200 for the root and all seven runtime assets |
| Deployed bytes | All seven HTTP responses and all seven files in the downloaded Pages archive match the accepted SHA-256 values; archive has no extra files |
| Live Chromium | All 228 questions passed at 1280×900 and 390×844 in ordinary and forced-colors modes on 2026-10-27 UTC; keyboard, held Enter, source/explanation association, persistence, reset, overflow, and page-error checks passed |

The byte comparison was recorded at **2026-10-27 07:03:41 UTC**. The official upload
action excludes the empty local `.nojekyll` marker, so it is absent from both the
Pages archive and the served site. This is a qualified seven-runtime-file match,
not an assertion that the eight-entry local manifest equals the remote archive.
This custom Pages workflow does not run Jekyll; see the pinned action in
[architecture](architecture.md).

Local deployment evidence is retained in `/tmp/opencode/ccarp-live-assets.json`,
`/tmp/opencode/ccarp-remote-artifact.json`, and `/tmp/opencode/ccarp-live/` screenshots.
The workflow links and pinned application revision above provide public release
references; temporary local evidence paths are not public download links.

### Pages Action runtime follow-up

The final documentation-only revision `f350f779903933cbceaf1c431b2485f59e4800dc`
passed [CI](https://github.com/bajor/claude-architect-professional-quiz/actions/runs/40465618321)
and [Pages](https://github.com/bajor/claude-architect-professional-quiz/actions/runs/40465618442).
The deployment nevertheless reported deprecated Node.js 20 runtimes in its older
official Pages Actions. A small follow-up replaces those pins with verified official
releases: configure-pages 6.0.0, upload-pages-artifact 5.0.0, and deploy-pages 5.0.1.
The JavaScript actions and the uploader's pinned upload-artifact 7.0.0 use Node.js 24.
Application validation/build tooling still uses Node.js 22. Default dotfile exclusion,
the static allowlist, gating, and permissions remain unchanged.

Updated workflow deployment and annotation checks must be observed before this
follow-up is reported complete. The earlier application/browser acceptance remains
valid for its unchanged runtime files, but its old workflow hash is not the new hash.

## Review-tool limitation

A fresh Claude process attempted `/review` before repository recreation, and another
attempt against the current workflow PR #30 failed with the same authentication error:
`Failed to authenticate: OAuth session expired and could not be refreshed`.
No successful Claude review is claimed. Independent review sessions and executable
checks are the fallback. No authenticated Claude review is claimed.

## Remaining limitations

- Difficulty labels are author judgments, not psychometric measurements. One simple
  Domain 1 constraint-comparison item remains labeled advanced; this is a low-severity
  calibration concern, not an incorrect key.
- A residual Domain 5 answer-length cue remains: choosing the shortest answer by word
  count, with uniform tie-breaking, scores 10/23 (43.5%) on its single-answer items.
  This is weaker than the original cue but prevents a claim that all length cues are absent.
- Browser coverage is Chromium on Linux at the two stated viewport sizes, not every
  browser, device, or assistive technology. No formal accessibility certification is claimed.
- Current product documentation can change; sources have explicit dates and version
  qualifications. Practice scores do not predict the official scaled exam result.

Acceptance requires passing local checks, closed substantive review findings, green
remote CI, a successful Pages deployment, equal reviewed/deployed asset bytes, and
observed live browser behavior. The limitations above remain visible after acceptance.

# References

1. [Architecture and reference baseline](architecture.md).
2. [Research and retrieval limitations](research-log.md).
