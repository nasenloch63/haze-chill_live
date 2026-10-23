import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const config = JSON.parse(await readFile(new URL("./indexnow.json", import.meta.url), "utf8"));
assert(/^[a-zA-Z0-9-]{8,128}$/.test(config.key), "Valid IndexNow verification key");
const origin = "https://" + config.host;
assert.equal(origin, "https://www.haze-chill.com", "Only the verified production host may be submitted");
const keyLocation = origin + "/" + config.key + ".txt";
const urlList = config.paths.map(path => {
  const url = new URL(path, origin);
  assert.equal(url.origin, origin);
  assert(!url.search && !url.hash);
  return url.href;
});
const payload = { host: config.host, key: config.key, keyLocation, urlList };
if (process.argv.includes("--dry-run")) {
  console.log(JSON.stringify({ dryRun: true, ...payload }, null, 2));
} else {
  const keyResponse = await fetch(keyLocation, { signal: AbortSignal.timeout(20000) });
  assert.equal(keyResponse.status, 200, "Publish the key file before submitting");
  assert.equal((await keyResponse.text()).trim(), config.key, "Production key matches");
  for (const url of urlList) {
    const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(20000) });
    assert.equal(response.status, 200, "Production URL must serve HTTP 200: " + url);
    assert(!/noindex/i.test(response.headers.get("x-robots-tag") || ""), "URL is indexable");
    const html = await response.text();
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(new URL(canonical).href, url, "Canonical matches submitted URL");
    assert(!/<meta name="robots" content="[^"]*noindex/i.test(html), "No HTML noindex");
  }
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(20000),
  });
  assert([200, 202].includes(response.status), "IndexNow returned " + response.status + ": " + await response.text());
  console.log("IndexNow HTTP " + response.status + ": " + urlList.length + " URLs received" + (response.status === 202 ? "; key validation pending" : "") + ". This is not an indexing or ranking guarantee.");
}
