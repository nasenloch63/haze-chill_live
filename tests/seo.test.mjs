import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StructuredData } from "../src/components/haze/structured-data.tsx";
import { buildLlmsIndex, buildLlmsFull } from "../src/lib/llms-content.ts";
import { buildPageMetadata, seoConfig } from "../src/lib/seo.ts";
import { faqItems } from "../src/data/faq-items.ts";
import { menuData } from "../src/data/menu-data.ts";

test("JSON-LD cannot terminate its script and round-trips the actual data", () => {
  const data = { name: "</script><script>alert(1)</script>", description: "<3 & café" };
  const html = renderToStaticMarkup(React.createElement(StructuredData, { data }));
  assert.equal((html.match(/<script/g) || []).length, 1);
  const content = html.match(/<script[^>]*>(.*)<\/script>/s)[1];
  assert(!content.includes("<"));
  assert.deepEqual(JSON.parse(content), data);
});
test("LLM text uses every current menu item, price and complete FAQ answer", () => {
  const full = buildLlmsFull();
  for (const item of menuData.flatMap(category => category.items)) assert(full.includes("- " + item.name + ": " + item.price), item.name);
  for (const item of faqItems) assert(full.includes(item.question) && full.includes(item.answer));
  assert(buildLlmsIndex().includes(seoConfig.baseUrl + "/gaming-kassel"));
  assert(full.includes("17:00–02:00"));
  assert(!full.includes("Xbox") && !full.includes("Nintendo Switch"));
});
test("Gaming metadata uses the canonical production host and permits indexing", () => {
  const meta = buildPageMetadata({ title: "Gaming Lounge", description: "PlayStation in Kassel", path: "/gaming-kassel" });
  assert.equal(meta.alternates.canonical, "https://www.haze-chill.com/gaming-kassel");
  assert.equal(meta.openGraph.url, meta.alternates.canonical);
  assert.equal(meta.robots.index, true);
  assert.equal(meta.robots.follow, true);
});
