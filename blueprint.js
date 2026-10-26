(function () {
  "use strict";

  const exam = {
    code: "CCAR-P",
    version: "1.0",
    effective: "2026-07",
    verifiedAt: "2026-10-26",
    questions: 63,
    minutes: 120,
    url: "https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542810%2FClaude+Certified+Architect+%E2%80%93+Professional+Exam+Guide.pdf"
  };
  // The guide has unnumbered bullets. IDs are stable project-assigned ordinals.
  const domains = [
    { id: 1, name: "Solution Design & Architecture", weight: 17, objectives: [
      "Translate business problems into Claude-based AI solutions",
      "Design end-to-end architectures (input → processing → output → feedback loops)",
      "Select appropriate architectural patterns (workflow, agentic, augmented LLM)",
      "Design multi-agent systems and orchestration strategies",
      "Apply decomposition techniques for complex problem solving",
      "Align solutions to business value pillars (efficiency, transformation, productivity, cost, performance SLAs)"
    ] },
    { id: 2, name: "Claude Models, Prompting & Context Engineering", weight: 13, objectives: [
      "Select appropriate Claude models based on trade-offs",
      "Design system prompts, templates, and guardrails",
      "Apply prompt engineering techniques (zero-shot, few-shot, chain-of-thought)",
      "Optimize context windows and manage token usage",
      "Implement prompt reuse strategies (caching, modular prompts, Skills)"
    ] },
    { id: 3, name: "Integration", weight: 19, objectives: [
      "Evaluate tool/agent configuration for capability bloat",
      "Analyze authentication and authorization requirements to identify security gaps",
      "Evaluate accuracy-latency trade-offs and justify configuration decisions",
      "Analyze observability challenges and select monitoring strategies at scale",
      "Design a RAG pipeline with appropriate chunking and indexing strategies",
      "Apply retrieval strategies matched to data shape and query pattern",
      "Evaluate connection protocols and select the appropriate integration mechanism (MCP, API/CLI, agent-to-agent)",
      "Evaluate progressive discovery vs. monolithic context strategy"
    ] },
    { id: 4, name: "Evaluation, Testing & Optimization", weight: 16, objectives: [
      "Define evaluation metrics (accuracy, latency, cost, safety, security)",
      "Design evaluation datasets and test frameworks using mixed methodologies",
      "Conduct A/B testing and iterative improvements",
      "Diagnose system issues (prompt failure, hallucinations, model mismatch)",
      "Optimize token usage, latency, and cost-performance trade-offs",
      "Monitor system performance using logging and observability tools"
    ] },
    { id: 5, name: "Governance, Safety & Risk Management", weight: 14, objectives: [
      "Implement guardrails and safety controls",
      "Identify risks, limitations, and failure modes of LLM systems",
      "Apply human-in-the-loop validation strategies",
      "Ensure compliance with regulations (e.g., GDPR, HIPAA, FedRAMP)",
      "Address ethical AI considerations (bias, fairness, transparency)"
    ] },
    { id: 6, name: "Stakeholder Communication & Lifecycle Management", weight: 14, objectives: [
      "Conduct structured discovery and requirement gathering",
      "Communicate architectural decisions and trade-offs",
      "Manage stakeholder feedback loops and expectation alignment (including SLAs)",
      "Document architectures and provide implementation guidance",
      "Support lifecycle phases (discovery, design, handoff, monitoring, iteration)"
    ] },
    { id: 7, name: "Developer Productivity & Operational Enablement", weight: 7, objectives: [
      "Configure Claude tools and environments for teams (e.g., Claude Code)",
      "Improve developer workflows using AI-assisted tooling",
      "Support debugging and operational issue resolution"
    ] }
  ];
  const objectives = Object.fromEntries(domains.flatMap((domain) =>
    domain.objectives.map((statement, index) => [`${domain.id}.${index + 1}`, { domain: domain.id, statement }])
  ));
  globalThis.CCARP_BLUEPRINT = { exam, domains, objectives };
})();
