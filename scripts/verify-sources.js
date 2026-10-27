"use strict";

// Optional maintenance check, not a CI network dependency or a substitute for semantic source review.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { ROOT, loadSources } = require("./load-bank.js");

async function retrieve(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(45000), headers: { "User-Agent": "CCAR-P-practice-source-verification/1.0" } });
  // ponytail: Buffers this curated documentation registry; use size-limited streaming for unbounded downloads.
  const body = Buffer.from(await response.arrayBuffer());
  if (!response.ok || body.length < 128) throw new Error(`HTTP ${response.status}, ${body.length} bytes`);
  return {
    status: response.status, finalUrl: response.url, bytes: body.length,
    contentType: response.headers.get("content-type"), sha256: crypto.createHash("sha256").update(body).digest("hex")
  };
}

async function main() {
  const records = [...loadSources().values()];
  records.push({ id: "official-exam-guide", url: globalThis.CCARP_BLUEPRINT.exam.url });
  const grouped = new Map();
  for (const record of records) {
    if (!grouped.has(record.url)) grouped.set(record.url, []);
    grouped.get(record.url).push(record);
  }
  const queue = [...grouped];
  const results = [];
  async function worker() {
    while (queue.length) {
      const [url, sources] = queue.shift();
      const entry = { ids: sources.map((source) => source.id), url, verifiedAt: new Date().toISOString() };
      try {
        Object.assign(entry, { retrieval: "primary-direct", ...await retrieve(url) });
      } catch (error) {
        entry.directFailure = error.message;
        const documentedProxy = sources.some((source) => source.verification?.includes("r.jina.ai"));
        if (documentedProxy) {
          try {
            const retrievalUrl = `https://r.jina.ai/${url}`;
            Object.assign(entry, { retrieval: "secondary-text-proxy", retrievalUrl, ...await retrieve(retrievalUrl) });
          } catch (proxyError) { entry.error = proxyError.message; }
        } else entry.error = error.message;
      }
      results.push(entry);
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  results.sort((a, b) => a.url.localeCompare(b.url));
  const report = {
    method: "HTTP content-retrieval snapshot only. Primary-source relevance is checked separately in question review. Text proxies are explicitly secondary retrieval.",
    records: results
  };
  fs.writeFileSync(path.join(ROOT, "docs", "source-verification.json"), JSON.stringify(report, null, 2) + "\n");
  const failed = results.filter((record) => record.error);
  console.log(`${results.length - failed.length}/${results.length} source URLs retrieved; ${results.filter((record) => record.retrieval === "secondary-text-proxy").length} secondary retrievals.`);
  if (failed.length) {
    console.error(failed.map((record) => `${record.url}: ${record.error}`).join("\n"));
    process.exitCode = 1;
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
