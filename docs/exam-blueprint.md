---
type: Reference
title: CCAR-P Professional exam blueprint
timestamp: "2026-10-26"
guide_version: "1.0"
guide_effective: "2026-07"
verified_at: "2026-10-26 UTC"
---

# CCAR-P Professional exam blueprint

**Scope authority:** Anthropic's [Professional Exam Guide][exam-guide], Version 1.0,
effective July 2026, exam code CCAR-P. The [official certification catalog][catalog]
links this PDF in its Architect Professional row. The [specific exam page][exam-page],
[Professional prep path][prep], and [certification FAQ][faq] provide official navigation,
not replacement objective lists. All were checked on **2026-10-26 UTC**.

## Provenance and document control

The PDF URL is the exact catalog-linked URL in [`blueprint.js`](../blueprint.js).
A direct fetch, without a mirror or text proxy, returned HTTP 200, `application/pdf`,
and 358,335 bytes. Its bytes match the supplied local PDF used to produce
`/tmp/opencode/ccarp-exam-guide.txt`.

```text
SHA-256: 19a111ae61a07066ebe26f7f2b87744f8266cfc0d47093a1d5bbf61e12dd4221
Verification date: 2026-10-26 UTC
```

Section 16, Document Control, lists only **1.0, Initial publication, July 2026**.
The catalog-linked document was still that version at verification; no newer guide
was verified. This is not a claim that every possible unpublished revision was searched.
The guide says it is subject to change without notice. [Documented program facts;
COI: Anthropic; single authoritative publisher, not independent performance evidence.]

## Official format versus practice-bank allocation

| Official guide fact | Value |
| --- | --- |
| Exam | Claude Certified Architect – Professional, CCAR-P |
| Content | 7 domains, 38 objective bullets |
| Number of items | 63 |
| Time limit | 120 minutes |
| Item format | Multiple-choice and multiple-response; each item states how many responses to select |
| Passing standard | Scaled score 720 on a 100–1,000 scale |

**720 is not a documented 72% raw-score cutoff.** Section 9 distinguishes the total
scaled score from domain percent-correct reporting. Neither the guide nor this
verification establishes the proportion of multiple-response questions, a raw-score
conversion, or exact scored-item counts within each domain.

The guide weights are approximate proportions of scored exam items. The **228-item**
bank allocation below is a project authoring target, not an official exam simulation,
live-question prediction, or inferred format distribution. Every practice item must be
original; do not copy sample stems/options or reproduce confidential exam content.

| Domain | Exact guide title | Weight | Objectives | Practice items |
| --- | --- | ---: | ---: | ---: |
| 1 | Solution Design & Architecture | 17% | 6 | 39 |
| 2 | Claude Models, Prompting & Context Engineering | 13% | 5 | 30 |
| 3 | Integration | 19% | 8 | 43 |
| 4 | Evaluation, Testing & Optimization | 16% | 6 | 36 |
| 5 | Governance, Safety & Risk Management | 14% | 5 | 32 |
| 6 | Stakeholder Communication & Lifecycle Management | 14% | 5 | 32 |
| 7 | Developer Productivity & Operational Enablement | 7% | 3 | 16 |
| Total | | 100% | 38 | 228 |

## Exact objectives

The statements below copy every Section 6 bullet exactly as represented in
[`blueprint.js`](../blueprint.js), with PDF line wrapping joined. **IDs are stable
project-assigned ordinal labels, not official objective numbering.** The PDF prints
unnumbered bullets. Domain numbers and weights are official.

### Domain 1: Solution Design & Architecture (17%)

| Project ID | Exact objective |
| --- | --- |
| 1.1 | Translate business problems into Claude-based AI solutions |
| 1.2 | Design end-to-end architectures (input → processing → output → feedback loops) |
| 1.3 | Select appropriate architectural patterns (workflow, agentic, augmented LLM) |
| 1.4 | Design multi-agent systems and orchestration strategies |
| 1.5 | Apply decomposition techniques for complex problem solving |
| 1.6 | Align solutions to business value pillars (efficiency, transformation, productivity, cost, performance SLAs) |

### Domain 2: Claude Models, Prompting & Context Engineering (13%)

| Project ID | Exact objective |
| --- | --- |
| 2.1 | Select appropriate Claude models based on trade-offs |
| 2.2 | Design system prompts, templates, and guardrails |
| 2.3 | Apply prompt engineering techniques (zero-shot, few-shot, chain-of-thought) |
| 2.4 | Optimize context windows and manage token usage |
| 2.5 | Implement prompt reuse strategies (caching, modular prompts, Skills) |

### Domain 3: Integration (19%)

| Project ID | Exact objective |
| --- | --- |
| 3.1 | Evaluate tool/agent configuration for capability bloat |
| 3.2 | Analyze authentication and authorization requirements to identify security gaps |
| 3.3 | Evaluate accuracy-latency trade-offs and justify configuration decisions |
| 3.4 | Analyze observability challenges and select monitoring strategies at scale |
| 3.5 | Design a RAG pipeline with appropriate chunking and indexing strategies |
| 3.6 | Apply retrieval strategies matched to data shape and query pattern |
| 3.7 | Evaluate connection protocols and select the appropriate integration mechanism (MCP, API/CLI, agent-to-agent) |
| 3.8 | Evaluate progressive discovery vs. monolithic context strategy |

### Domain 4: Evaluation, Testing & Optimization (16%)

| Project ID | Exact objective |
| --- | --- |
| 4.1 | Define evaluation metrics (accuracy, latency, cost, safety, security) |
| 4.2 | Design evaluation datasets and test frameworks using mixed methodologies |
| 4.3 | Conduct A/B testing and iterative improvements |
| 4.4 | Diagnose system issues (prompt failure, hallucinations, model mismatch) |
| 4.5 | Optimize token usage, latency, and cost-performance trade-offs |
| 4.6 | Monitor system performance using logging and observability tools |

### Domain 5: Governance, Safety & Risk Management (14%)

| Project ID | Exact objective |
| --- | --- |
| 5.1 | Implement guardrails and safety controls |
| 5.2 | Identify risks, limitations, and failure modes of LLM systems |
| 5.3 | Apply human-in-the-loop validation strategies |
| 5.4 | Ensure compliance with regulations (e.g., GDPR, HIPAA, FedRAMP) |
| 5.5 | Address ethical AI considerations (bias, fairness, transparency) |

### Domain 6: Stakeholder Communication & Lifecycle Management (14%)

| Project ID | Exact objective |
| --- | --- |
| 6.1 | Conduct structured discovery and requirement gathering |
| 6.2 | Communicate architectural decisions and trade-offs |
| 6.3 | Manage stakeholder feedback loops and expectation alignment (including SLAs) |
| 6.4 | Document architectures and provide implementation guidance |
| 6.5 | Support lifecycle phases (discovery, design, handoff, monitoring, iteration) |

### Domain 7: Developer Productivity & Operational Enablement (7%)

| Project ID | Exact objective |
| --- | --- |
| 7.1 | Configure Claude tools and environments for teams (e.g., Claude Code) |
| 7.2 | Improve developer workflows using AI-assisted tooling |
| 7.3 | Support debugging and operational issue resolution |

## Scope ambiguities and authoring acceptance

The July guide defines **what** to cover. Technical documentation retrieved in October
defines the dated mechanisms used in rationales, not a retroactive July API contract.
Public prep descriptions add learning context, not extra exam objectives. The guide's
chain-of-thought bullet does not establish access to private reasoning or one thinking
API across all models. See the dated conflicts in the [research log](research-log.md).

Accept blueprint alignment only when all 38 statements and project IDs match
`blueprint.js`, all seven weights total 100%, and the 228-item allocation is labeled
practice-only. Apply the [authoring contract](question-authoring.md) and cite technical
IDs from the [source registry](sources.md) for individual answer rationales.

# References

1. ANTHROPIC. *Claude Certified Architect – Professional Exam Guide*. Version 1.0,
   effective July 2026. Sections 5, 6, 8, 9, 13, 16. [Official PDF][exam-guide].
   Accessed on: 2026-10-26 UTC. [COI: Anthropic]
2. ANTHROPIC PARTNER ACADEMY. *All certifications*. [Catalog][catalog]. Accessed on:
   2026-10-26 UTC. [COI: Anthropic]
3. ANTHROPIC PARTNER ACADEMY. *Claude Certified Architect – Professional Certification*.
   [Exam page][exam-page]. Accessed on: 2026-10-26 UTC. [COI: Anthropic]
4. ANTHROPIC PARTNER ACADEMY. *Claude Certified Architect Professional Prep Course*.
   [Public prep path][prep]. Accessed on: 2026-10-26 UTC. Technical registry ID:
   `life-official-prep-path`. [COI: Anthropic]
5. ANTHROPIC PARTNER ACADEMY. *Certification FAQ*. [FAQ][faq]. Accessed on:
   2026-10-26 UTC. Only public navigation is relied on here. [COI: Anthropic]

[exam-guide]: https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542810%2FClaude+Certified+Architect+%E2%80%93+Professional+Exam+Guide.pdf
[catalog]: https://anthropic-partners.skilljar.com/page/partner-certifications
[exam-page]: https://anthropic-partners.skilljar.com/claude-certified-architect-professional-certification
[prep]: https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional
[faq]: https://anthropic-partners.skilljar.com/page/faq-certifications
