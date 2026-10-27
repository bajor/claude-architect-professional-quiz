---
type: Research
title: CCAR-P implementation evidence snapshot
timestamp: "2026-10-26"
status: evidence-snapshot
---

# Research log: 2026-10-26 UTC

This snapshot supports an **original 228-question static Professional practice quiz**.
It is implementation evidence, not a report-only substitute for that deliverable,
an official question bank, or a prediction of live exam contents. The [exam blueprint](exam-blueprint.md)
owns scope, exact objectives, exam format, practice allocation, and PDF provenance.
The original snapshot contains **66 authoritative source records** in four JSON arrays.
The [source navigation](sources.md) reflects subsequent additions recorded below.
This log records consequential interpretations and limitations.

## Method and confidence

The synthesis read all four research notes and their four source arrays: architecture
and models (18), integration and evaluation (20), governance and lifecycle (18), and
developer enablement (10). No earlier research report was supplied. Their records
document content retrieval on 2026-10-26, not acceptance of search snippets. The report
writer additionally fetched the official catalog, specific exam page, public prep path,
FAQ navigation, and catalog-linked PDF directly. The PDF matches the supplied local
copy. Exact verification details belong in the blueprint document.

**Documented fact** means the selected source actually states the claim. **[inference]**
means an architectural deduction or authoring recommendation, not a vendor mandate.
Protocol requirements are authoritative for their named version; legal text is evidence
of its wording and stated scope, not a compliance opinion. A single normative authority
does not need competing copies to define its own contract. It also does not establish
independently replicated performance or control effectiveness.

**[COI: Anthropic]** applies to Anthropic documentation, engineering accounts, policy,
and curriculum. **[COI: Google]** applies to Google SRE practice guidance. COI means
vendor conflict of interest. Several pages from one publisher, duplicate source URLs,
and text proxies do not supply independent corroboration. Vendor benchmark, saving,
productivity, and return-on-investment claims remain **single-source, low confidence
for independent corroboration**. They must not become universal answer guarantees.
Vendor admissions of limitations are retained, including hallucinations and output exceptions.

The JSON arrays preserve the supplied IDs, metadata, evidence, verification descriptions,
and caveats. Only `section` labels were normalized to verified titles/sections, never
invented URL fragments. There are 66 unique IDs and 62 distinct URLs. All technical
source URL definitions live in those arrays; Markdown tables are navigation only.

## Version conflicts that change answer logic

| Topic | Documented evidence | Authoring consequence [inference] |
| --- | --- | --- |
| Guide versus rolling docs | July 2026 guide scope differs from October documentation currency. Historical articles explicitly describe older tooling or a particular implementation. | Retain exact guide bullets; pin API/protocol/model/provider/date where behavior changes. Do not silently reconstruct a July runtime from October pages. |
| MCP 2026-07-28 | Current published revision checked by the integration researcher. Its transport model uses per-request metadata; older initialization-based sessions are compatibility history. Authorization is optional overall; the HTTP protected-resource flow has version-specific requirements and is not the stdio credential flow. | Name Model Context Protocol (MCP) revision in protocol questions. Do not claim every MCP connection requires OAuth or use legacy initialization rules as current. IDs `int-mcp-transports`, `int-mcp-auth`, `int-mcp-security`. |
| Claude API 2026-10-21 | Migration removes `temperature`, `top_p`, and `top_k`, returning HTTP 400 when supplied. New SDK versions change API-key header defaults to `Authorization: Bearer`; the API still accepts `X-Api-Key`. [COI: Anthropic] | Do not prescribe sampling adjustment as an API-wide fix. Pin any legacy sampling example, and recheck gateway forwarding/redaction on upgrades. ID `int-api-version`. |
| Thinking-budget contradiction | General prompting says a manual budget provides a “hard ceiling on thinking costs.” Specialized Extended thinking says “The budget is a target rather than a strict cap” and identifies `max_tokens` as the hard total-output ceiling. [COI: Anthropic] | Prefer the specialized reference for supported manual mode, preserve the contradiction, and never key a universal strict `budget_tokens` cap. Mode support is model-specific; visible thinking is a summary, not raw private reasoning. IDs `prompting`, `extended-thinking`, `thinking`. |
| Structured outputs | Current response field is `output_config.format`; strict tool inputs use `strict: true`. Supported JSON Schema is a subset. Refusal, token truncation, and a documented enum/const capitalization exception limit headline guarantees. SDK helpers differ in client validation. [COI: Anthropic] | Separate structure, factual/business validity, and authorization. Do not mix old `output_format` examples with current wire fields or claim schema constraints prevent every failure. ID `structured`. |
| Claude Code version | Researcher observed CLI 2.1.304. Rolling manuals describe skill-name features needing 2.1.309+ and tool-event request IDs needing 2.1.310+. [COI: Anthropic for manuals] | A page fetch does not establish those features in the local CLI. Preserve version qualifications, beta status, and key-specific exceptions. IDs `code-skills`, `code-monitoring`, `code-settings`. |

Technical evidence: [architecture/model array](../data/sources/architecture-models.json),
[integration/evaluation array](../data/sources/integration-evaluation.json), and
[developer array](../data/sources/developer-enablement.json).

## Stable distinctions to test under stated constraints

| Distinction | Documented fact and source IDs | Architecture inference for original scenarios |
| --- | --- | --- |
| Simplest sufficient architecture | Predefined workflows differ from model-directed control; multiple agents add coordination and token costs. `agents`, `multiagent`, `model-choice`. [COI: Anthropic] | Match fixed dependencies, independently separable work, and task value to the pattern. More agents are not intrinsically better. |
| Caching versus context capacity | Cached prefixes still occupy context. Prefix reuse has exact matching, write, length, lifetime, model, and platform conditions. `caching`, `context-windows`, `eval-cache`. [COI: Anthropic] | Use caching for repeated prefix processing, retrieval for evidence selection, compaction for summaries, clearing for selected history, and Skills for procedure reuse. None creates unlimited context or response memoization. |
| Discovery versus authorization | Deferred tool loading reduces initial model context; standard requests still carry complete definitions. MCP restricts token resource/audience and forbids passthrough. `int-tool-search`, `int-mcp-auth`, `int-mcp-security`. [COI: Anthropic for tool search] | Remove out-of-role capabilities and enforce backend permissions. Hiding a schema or deferring discovery does not remove authority. |
| Instructions versus enforcement | `CLAUDE.md` supplies context. Permission rules/settings, hooks, shell isolation, and service credentials have different boundaries; `allowed-tools`/`--allowedTools` pre-approve, not exclusively remove other tools. `code-memory`, `code-settings`, `code-skills`, `code-headless`, `code-sandboxing`. [COI: Anthropic] | Do not treat prose, XML, a Skill, approval suppression, or the Bash sandbox as whole-agent isolation. Async/post-action hooks cannot retroactively prevent an action. |
| Responsiveness versus completed outcome | Streaming exposes early output; HTTP 200 can precede stream failure; tool argument fragments are incomplete; API retries do not establish exactly-once tool effects. `int-latency`, `int-streaming`, `int-errors`, `int-advanced-tools`. [COI: Anthropic] | Measure the completed acceptable business operation. For uncertain consequential writes, application deduplication/reconciliation is a design responsibility, not a provider request-ID guarantee. |
| Retrieval versus answer quality | Semantic and lexical matching serve different queries; contextualization precedes embedding and lexical indexing; reranking adds work. Reported retrieval failure is not answer accuracy. `int-contextual-retrieval`. [COI: Anthropic] | Supply corpus/query constraints and test changed indexes. No universal chunk size, overlap, top-K, or improvement percentage is established. Structured queries for exact counts are an inference, not a requirement in that article. |
| Evaluation versus convincing narration | Outcome state differs from an agent's success claim. Code, model, and human graders differ; model graders need calibration. `pass@k` and `pass^k` measure different reliability properties. `eval-agent-evals`, `eval-criteria`. [COI: Anthropic] | Use representative held-out cases, isolated trials, outcome/security checks, and calibrated judgment. Inspect the grader and retrieval before declaring model mismatch. Offline results, production monitoring, and traffic A/B tests are complementary. |
| Token counters versus billing | Messages input totals combine uncached, cache-write, and cache-read counters; OpenTelemetry input totals already include cache activity; streaming usage deltas are cumulative. Trace delivery can duplicate or lose spans. `eval-cache`, `eval-otel`, `int-streaming`, `eval-usage-cost`. [COI: Anthropic] | Do not sum all interfaces or parent/child spans together. Deduplicate trace/span IDs and reconcile with usage/cost reporting rather than treating sampled traces as an invoice. |
| Pricing versus architecture | Categories include input/output/cache/tool costs and model/platform exceptions. `eval-pricing`, `model-choice`. [COI: Anthropic] | Do not hard-code current model pricing, a cheapest model, or universal cache discounts. Supply dated scenario rates and include retries, infrastructure, and human work when relevant. |

## Compliance and lifecycle boundaries

The General Data Protection Regulation (GDPR), US Health Insurance Portability and
Accountability Act (HIPAA), and Federal Risk and Authorization Management Program
(FedRAMP) concern different legal/authorization scopes. Original law and agency
guidance take priority over a vendor's readiness wording. The evidence does **not**
establish any particular deployment's compliance or a Claude product's FedRAMP
marketplace status. IDs: `gov-gdpr-eurlex`, `gov-hipaa-hhs-cloud`, `gov-fedramp-scope`,
`gov-fedramp-agency-use` in the [governance array](../data/sources/governance-lifecycle.json).

**Documented:** GDPR separates lawful basis, minimization, processor obligations,
significant solely automated decisions, impact assessment, and transfers. HHS guidance
requires applicable business associate agreements (BAAs), risk management, and safeguards
for electronic protected health information (ePHI); encryption alone is insufficient.
Anthropic's HIPAA readiness, zero data retention (ZDR), no-training commitment, data
residency, accepted API request, and feature eligibility are separate properties.
Its signed BAA and exact eligible organization/features matter. [COI: Anthropic]
IDs: `gov-gdpr-eurlex`, `gov-hipaa-hhs-cloud`, `gov-api-data-retention`, `gov-commercial-retention`.

**Documented:** the FedRAMP schedule places optional early adoption on 2026-07-04 and
mandatory adoption on 2027-01-01, subject to applicability and specific effective dates.
The 2026 guidance was not universally mandatory on the research date. Provider evidence
does not replace the agency's system authorization or customer-operated controls.
IDs: `gov-fedramp-timeline`, `gov-fedramp-agency-use`.

**Documented:** National Institute of Standards and Technology (NIST) guidance describes
confabulation, automation bias, subgroup harms, named risk ownership, feedback, and
continuous revalidation. Its framework/profile/playbook are voluntary, not certification
or proof that a control works. Public prep pages require actionable trade-offs and
durable handoffs. Google distinguishes a service level indicator (SLI), target objective
(SLO), and an agreed response policy; the stakeholder module names actions after a
service level agreement (SLA) breach. [COI: Anthropic for prep; COI: Google for SRE]
IDs: `gov-nist-rmf-core`, `gov-nist-genai-profile`, `gov-nist-playbook-govern`,
`life-official-stakeholder-course`, `life-google-slos`, `life-google-production-handoff`.

**[inference]:** compliance scenarios must state processing, jurisdiction, contract,
feature/date, owner, and evidence. Human approval must have authority and occur before
the consequential action; a model's self-reported confidence is not a calibrated
probability. Assess affected groups, actual outcomes, receiving-team readiness, review
capacity, and rollback/shutdown responsibilities. No universal fairness threshold,
review cutoff, handoff template, or availability error budget overrides legal/security
constraints. These syntheses use the governance sources, not hidden course lessons.

## Retrieval and runtime limitations

- **EUR-Lex:** direct requests returned empty HTTP 202 responses. Researchers read full
  primary legislative text through `r.jina.ai`, retaining the original URL. This is
  secondary retrieval of primary content, not direct full-text verification or an
  exhaustive 2026 legal analysis. `gov-gdpr-eurlex` preserves the proxy URL and caveats.
- **HHS:** direct requests returned HTTP 403. Full agency text came through the same
  proxy with source attribution. No independent validation of current legal applicability
  was performed. `gov-hipaa-hhs-cloud` preserves that limitation.
- **NIST PDF:** the text-fetch tool could not render it; the researcher directly
  downloaded the final July 2024 PDF and extracted its full text. Do not substitute the
  withdrawn April draft. Record: `gov-nist-genai-profile`.
- **Canonical migrations:** selected engineering articles resolve under `/research/`;
  hosting is under `code.claude.com`. Legacy template/evaluation paths consolidate into
  current prompting/`develop-tests` content. The old evaluation-tool route did not verify
  a separate current Console feature. Historical release posts do not set current support.
- **Runtime:** no production API, cache, Skills, MCP authorization, collector, CI policy,
  or application evaluations were executed by this research. The developer researcher
  observed `/review` dispatch in a constrained fresh CLI probe, not a completed authenticated
  review. Installed browser packages/binaries were discovered, not functionally launched
  or used to validate this quiz. These observations do not establish application readiness.

## Implementation handoff acceptance

1. Keep exact objective mapping in `blueprint.js`; use the [authoring contract](question-authoring.md)
   for original scenarios, response counts, explanations, difficulty, and practice targets.
2. Resolve each question's technical `sourceIds` against the JSON registry and read the
   relevant evidence/caveats. State decisive constraints; label architecture inference
   and version-sensitive assumptions instead of presenting them as universal facts.
3. Validate JSON, 66 unique source IDs, preservation of input metadata/evidence, genuine
   section labels, source-table navigation, and all 38 objective statements. Keep each
   source file below 1,000 lines. These are evidence-handoff checks, not application tests.
4. Complete and verify the question bank, static interface, answer behavior, coverage,
   accessibility, build, and applicable repository checks separately. A research report
   and source registry alone do not complete the user's quiz request.

## Follow-up source retrieval snapshot

`scripts/verify-sources.js` subsequently retrieved all **63 distinct source URLs**
(62 technical URLs plus the official PDF). The machine-readable
[retrieval ledger](source-verification.json) records actual timestamps, HTTP status,
final URL, byte count, and SHA-256. One request required explicitly marked secondary
text-proxy retrieval, EUR-Lex after an empty HTTP 202 response. HHS was directly
retrievable in this follow-up, despite requiring a proxy during the original research.
This does not rewrite the earlier retrieval history or establish legal applicability.
HTTP retrieval alone does not verify semantic relevance; the independent per-question
reviews separately evaluate claims and answer sets against the cited documentation.

## Independent-review evidence additions: 2026-10-27 UTC

Review identified methodology that needed more specific evidence than the general
evaluation pages. Six primary/project records were added to the integration/evaluation
array: grouped splits, cluster assignment, repeated dashboard looks, mature longitudinal
outcomes, move semantics, and cross-process trace-context propagation. The actual
scikit-learn, Microsoft ExP, Spotify, GNU, and OpenTelemetry pages were fetched directly.
Applying their mechanisms to the supplied scenarios remains explicitly identified as
inference. Cluster assignment does not by itself establish power or a valid analysis.
No universal experiment duration, p-value threshold, or vendor percentage was imported.

OWASP transaction authorization and the Amazon Builders' Library retry account supply
two additional governance records. They support binding approval to significant data,
atomic shared once-use state, and handling uncertain side effects. Application-owned
replay protection is not a native Claude feature or a universal exactly-once guarantee.
The AWS, Microsoft, and Spotify accounts carry their corresponding publisher COI.

The resulting registry has **74 unique IDs and 70 distinct technical URLs**. A fresh
HTTP snapshot retrieved **71/71 URLs**, including the official guide, with only EUR-Lex
requiring the explicitly marked text proxy. The current [retrieval ledger](source-verification.json)
supersedes the earlier HTTP snapshot for retrieval evidence, not for the historical
claims above. Independent review and its corrections are recorded in [verification](verification.md).

# References

1. [Exact official scope, catalog links, PDF hash, and verification](exam-blueprint.md).
2. [Architecture/model source records](../data/sources/architecture-models.json).
3. [Integration/evaluation source records](../data/sources/integration-evaluation.json).
4. [Governance/lifecycle source records](../data/sources/governance-lifecycle.json).
5. [Developer-enablement source records](../data/sources/developer-enablement.json).
6. [Navigable source table](sources.md). Bibliographic metadata and original evidence
   remain in the JSON arrays; this log does not define a competing URL ledger.
