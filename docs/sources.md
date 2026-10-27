---
type: Reference
title: Technical source registry navigation
timestamp: "2026-10-27"
---

# Technical sources

**74 source records, 70 distinct URLs, retrieved 2026-10-26 and 2026-10-27.** The four JSON arrays in
[`data/sources/`](../data/sources/) are authoritative for IDs, URLs, verified page/section
labels, versions, evidence, retrieval qualifications, and caveats. This table is derived
navigation, not a second source ledger. Distinct IDs can intentionally cite the same
page for different objectives; they are not independent corroboration.

Scope follows the [exact exam blueprint](exam-blueprint.md). Version conflicts,
evidence confidence, vendor conflicts of interest, and proxy-retrieval limits are
recorded in the [research log](research-log.md). A working link verifies neither current
runtime behavior nor a vendor performance claim. All Anthropic, Google, AWS, Microsoft, and Spotify sources
carry the corresponding vendor conflict of interest (COI); see the preserved evidence.

## Architecture and models: 18 records

Authoritative array: [`architecture-models.json`](../data/sources/architecture-models.json).
Domain 1 and Domain 2, with adjacent controls where needed.

| Source ID | Verified title and link | Scope / version | Retrieved |
| --- | --- | --- | --- |
| `agents` | [Building effective agents](https://www.anthropic.com/research/building-effective-agents) | Architecture patterns; 2024-12-19, tooling-update notice | 2026-10-26 |
| `multiagent` | [How we built our multi-agent research system](https://www.anthropic.com/research/multi-agent-research-system) | Delegation/reliability; 2025-06-13 implementation account | 2026-10-26 |
| `model-choice` | [Choosing the right model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model) | Task-fit trade-offs; rolling docs | 2026-10-26 |
| `prompt-overview` | [Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | Success criteria before prompts; rolling docs | 2026-10-26 |
| `prompting` | [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | Prompts/examples/chaining; rolling docs, budget wording conflict | 2026-10-26 |
| `extended-thinking` | [Extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking) | Manual-mode budgets/compatibility; rolling docs | 2026-10-26 |
| `thinking` | [Thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) | Summaries/preservation/accounting; rolling, model-specific | 2026-10-26 |
| `caching` | [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | Exact-prefix reuse; rolling, model/platform exceptions | 2026-10-26 |
| `context-windows` | [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) | Capacity/overflow/accounting; rolling docs | 2026-10-26 |
| `context-engineering` | [Effective context engineering for AI agents](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents) | Context selection/memory; 2025-09-29 design guidance | 2026-10-26 |
| `context-editing` | [Context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing) | Selective history clearing; rolling beta | 2026-10-26 |
| `compaction` | [Compaction overview](https://platform.claude.com/docs/en/build-with-claude/compaction) | On-demand versus threshold summaries; rolling beta | 2026-10-26 |
| `skills` | [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) | Reuse/progressive disclosure/surface limits; rolling docs | 2026-10-26 |
| `structured` | [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) | JSON/tool constraints and exceptions; rolling docs | 2026-10-26 |
| `deployment` | [Hosting the Agent SDK](https://code.claude.com/docs/en/agent-sdk/hosting) | Self-hosted CLI subprocess/state/isolation; rolling docs | 2026-10-26 |
| `api-overview` | [API overview](https://platform.claude.com/docs/en/api/overview) | Direct/cloud route boundaries; rolling docs | 2026-10-26 |
| `guardrails` | [Mitigate jailbreaks and prompt injections](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks) | Untrusted data/defense in depth; rolling docs | 2026-10-26 |
| `token-counting` | [Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting) | Estimated model-specific input counts; rolling docs | 2026-10-26 |

## Integration and evaluation: 26 records

Authoritative array: [`integration-evaluation.json`](../data/sources/integration-evaluation.json).
Domain 3 and Domain 4.

| Source ID | Verified title and link | Scope / version | Retrieved |
| --- | --- | --- | --- |
| `eval-grouped-splits` | [scikit-learn: Cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation-iterators-for-grouped-data) | Group-dependent samples and protected test sets; stable project guide | 2026-10-27 |
| `eval-cluster-randomization` | [Microsoft ExP: Tenant-randomized A/B tests](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/articles/why-tenant-randomized-a-b-test-is-challenging-and-tenant-pairing-may-not-work/) | Cluster assignment, variance and power; 2020-11-04 | 2026-10-27 |
| `eval-repeated-looks` | [Microsoft ExP: During-experiment trustworthiness](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/articles/patterns-of-trustworthy-experimentation-during-experiment-stage/) | Repeated looks, stopping and guardrails; 2021-01-25 | 2026-10-27 |
| `eval-longitudinal-outcomes` | [Spotify: Sequential tests with longitudinal data, Part 1](https://engineering.atspotify.com/2023/7/bringing-sequential-testing-to-experiments-with-longitudinal-data-part-1-the-peeking-problem-2-0) | Mature fixed-window outcomes and sequential-test assumptions; 2023-07-18 | 2026-10-27 |
| `eval-move-semantics` | [GNU Coreutils: mv](https://www.gnu.org/software/coreutils/manual/html_node/mv-invocation.html) | Move versus copy; rolling project manual | 2026-10-27 |
| `eval-context-propagation` | [OpenTelemetry: Context propagation](https://opentelemetry.io/docs/concepts/context-propagation/) | Cross-process causal context, carriers and security; rolling project guide | 2026-10-27 |
| `int-client-loop` | [How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works) | Client/server loops; rolling docs | 2026-10-26 |
| `int-client-results` | [Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls) | Result IDs/order/errors; rolling docs | 2026-10-26 |
| `int-mcp-auth` | [MCP: Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization) | Protected resources/scopes; MCP 2026-07-28 | 2026-10-26 |
| `int-mcp-security` | [MCP: Authorization Security Considerations](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations) | Audience/PKCE/no passthrough; MCP 2026-07-28 | 2026-10-26 |
| `int-mcp-transports` | [MCP: Transport overview](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports) | stdio/HTTP/per-request metadata; MCP 2026-07-28 | 2026-10-26 |
| `int-tool-search` | [Tool search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool) | Deferred context loading; tools dated 20251119, rolling docs | 2026-10-26 |
| `int-advanced-tools` | [Introducing advanced tool use](https://www.anthropic.com/engineering/advanced-tool-use) | Discovery/programmatic orchestration; 2025-11-24 release article | 2026-10-26 |
| `int-contextual-retrieval` | [Introducing Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval) | RAG/hybrid/context/reranking; 2024-09-19 experiment report | 2026-10-26 |
| `int-latency` | [Reducing latency](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency) | First-token versus completion time; rolling docs | 2026-10-26 |
| `int-streaming` | [Streaming messages](https://platform.claude.com/docs/en/build-with-claude/streaming) | Events/partial JSON/cumulative usage; rolling, version-specific recovery | 2026-10-26 |
| `int-errors` | [Claude API errors](https://platform.claude.com/docs/en/api/errors) | Failure classes/retries/request IDs; rolling docs | 2026-10-26 |
| `int-a2a` | [A2A Protocol: v1.0 release announcement](https://a2a-protocol.org/latest/blog/2026/03/12/a2a-protocol-ships-v10-production-ready-standard-for-agent-to-agent-communication/) | Inter-agent coordination; v1.0 announcement, 2026-03-12 | 2026-10-26 |
| `int-api-version` | [Migrating to API version 2026-10-21](https://platform.claude.com/docs/en/api/migration-2026-10-21) | Removed sampling fields/auth header/SDK majors; API 2026-10-21 | 2026-10-26 |
| `eval-criteria` | [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) | Metrics/representative datasets; rolling docs | 2026-10-26 |
| `eval-agent-evals` | [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Outcomes/graders/trials/regressions/A-B; 2026-01-09 | 2026-10-26 |
| `eval-otel` | [OpenTelemetry tracing for the Claude API](https://platform.claude.com/docs/en/manage-claude/opentelemetry) | Trace/privacy/accounting semantics; rolling beta | 2026-10-26 |
| `eval-pricing` | [Pricing](https://platform.claude.com/docs/en/about-claude/pricing) | Cost categories, not fixed question prices; USD snapshot | 2026-10-26 |
| `eval-cache` | [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | Prefix layout/usage counters; rolling docs | 2026-10-26 |
| `eval-usage-cost` | [Usage and Cost API](https://platform.claude.com/docs/en/manage-claude/usage-cost-api) | Historical Admin API accounting; rolling, platform exceptions | 2026-10-26 |
| `eval-hallucinations` | [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) | Grounding/abstention/remaining risk; rolling docs | 2026-10-26 |

## Governance and lifecycle: 20 records

Authoritative array: [`governance-lifecycle.json`](../data/sources/governance-lifecycle.json).
Domain 5 and Domain 6. EUR-Lex and HHS links identify the primary publisher; their
full text was obtained through a third-party proxy, as recorded in the JSON.

| Source ID | Verified title and link | Scope / version | Retrieved |
| --- | --- | --- | --- |
| `gov-prompt-injection` | [Mitigate jailbreaks and prompt injections](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks) | Application controls/failures; rolling docs | 2026-10-26 |
| `gov-hallucinations` | [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) | Validation, not correctness guarantee; rolling docs | 2026-10-26 |
| `gov-api-data-retention` | [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) | Contract/feature/ZDR/HIPAA boundaries; rolling table | 2026-10-26 |
| `gov-commercial-retention` | [How long do you store my organization's data?](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data) | Retention/exceptions/feedback; dated 2026-07-01 | 2026-10-26 |
| `gov-nist-rmf-core` | [AI Risk Management Framework 1.0: Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | Governance/ownership/lifecycle; 2023, revision notice | 2026-10-26 |
| `gov-nist-playbook-govern` | [AI RMF Playbook: Govern](https://airc.nist.gov/airmf-resources/playbook/govern/) | Implementation suggestions; living AI RMF 1.0 companion | 2026-10-26 |
| `gov-nist-genai-profile` | [Generative Artificial Intelligence Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | Risk/actions; final NIST AI 600-1, July 2024, direct PDF | 2026-10-26 |
| `gov-gdpr-eurlex` | [Regulation (EU) 2016/679](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679) | Original OJ text, 2016; proxy retrieval, not exhaustive current law | 2026-10-26 |
| `gov-hipaa-hhs-cloud` | [Guidance on HIPAA & Cloud Computing](https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html) | Regulated relationships/BAA/safeguards; 2016-10-06, proxy | 2026-10-26 |
| `gov-fedramp-scope` | [Scope of FedRAMP](https://www.fedramp.gov/2026/scope) | Agency-specific scope; 2026 early-adoption guidance | 2026-10-26 |
| `gov-fedramp-agency-use` | [Using a FedRAMP Certified Cloud Service](https://www.fedramp.gov/2026/agencies/use) | Shared responsibility/agency authorization; 2026 early adoption | 2026-10-26 |
| `gov-fedramp-timeline` | [Important Dates for the Consolidated Rules for 2026](https://www.fedramp.gov/2026/timeline/) | Transition/effective dates; live schedule | 2026-10-26 |
| `life-official-prep-path` | [Claude Certified Architect Professional Prep Course](https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional) | Public learning objectives; rolling, not gated lessons | 2026-10-26 |
| `gov-official-safety-course` | [Responsible AI, Safety & Risk for Architects](https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional/responsible-ai-safety-risk-for-architects) | Public module description; rolling | 2026-10-26 |
| `life-official-stakeholder-course` | [Stakeholder Engagement, Lifecycle & GTM](https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional/stakeholder-engagement-lifecycle-gtm) | Public module description; rolling | 2026-10-26 |
| `life-success-evaluations` | [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) | Acceptance/feedback/change gates; rolling, canonical redirect | 2026-10-26 |
| `life-google-slos` | [Implementing SLOs](https://sre.google/workbook/implementing-slos/) | Owned user-relevant reliability targets; SRE Workbook, 2018 | 2026-10-26 |
| `gov-transaction-authorization` | [OWASP: Transaction Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html) | Server-side data-bound approval, atomic once-use enforcement; rolling project guide | 2026-10-27 |
| `gov-idempotent-retries` | [AWS: Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) | Ambiguous effects, caller identities and durable deduplication; practitioner account | 2026-10-27 |
| `life-google-production-handoff` | [The Evolving SRE Engagement Model](https://sre.google/sre-book/evolving-sre-engagement-model/) | Readiness/training/ownership transfer; online edition 2017 | 2026-10-26 |

## Developer enablement: 10 records

Authoritative array: [`developer-enablement.json`](../data/sources/developer-enablement.json).
Domain 7. These rolling manuals are not a specification for the locally observed
Claude Code 2.1.304; preserve each record's minimum-version qualifications.

| Source ID | Verified title and link | Scope / version | Retrieved |
| --- | --- | --- | --- |
| `code-memory` | [How Claude remembers your project](https://code.claude.com/docs/en/memory) | Instruction loading versus enforcement; rolling docs | 2026-10-26 |
| `code-settings` | [Settings files and precedence](https://code.claude.com/docs/en/settings) | Scope/merging/trust/validation; rolling, per-key exceptions | 2026-10-26 |
| `code-hooks` | [Hooks reference](https://code.claude.com/docs/en/hooks) | Event-specific gates/failure handling; rolling, 2.1.295+ qualifications | 2026-10-26 |
| `code-skills` | [Extend Claude with skills](https://code.claude.com/docs/en/skills) | Loading/invocation/tool grants; rolling, some 2.1.305+/2.1.309+ | 2026-10-26 |
| `code-mcp` | [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp) | Configuration scope/trust/connection status; rolling docs | 2026-10-26 |
| `code-sandboxing` | [Configure the sandboxed Bash tool](https://code.claude.com/docs/en/sandboxing) | Shell boundary/exclusions/credentials; rolling, platform-specific | 2026-10-26 |
| `code-headless` | [Run Claude Code programmatically](https://code.claude.com/docs/en/headless) | Unattended configuration/approval/events; rolling, version-qualified | 2026-10-26 |
| `code-github-actions` | [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions) | CI credentials/review/bounds/identity; rolling, mutable action @v1 | 2026-10-26 |
| `code-best-practices` | [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) | Executable checks/fresh review; rolling recommendations | 2026-10-26 |
| `code-monitoring` | [Monitoring](https://code.claude.com/docs/en/monitoring-usage) | Telemetry/privacy/beta traces; some request IDs require 2.1.310+ | 2026-10-26 |

Acceptance: each table ID and URL must match its authoritative JSON record, all 74
IDs must be present once, and retrieval/version summaries must not erase caveats.
Use the full record, not this shortened table, when deciding whether a source supports
a particular keyed answer.

# References

1. [Architecture and models source records](../data/sources/architecture-models.json).
2. [Integration and evaluation source records](../data/sources/integration-evaluation.json).
3. [Governance and lifecycle source records](../data/sources/governance-lifecycle.json).
4. [Developer enablement source records](../data/sources/developer-enablement.json).
5. [Official exam scope and provenance](exam-blueprint.md).
