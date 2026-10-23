import assert from "node:assert/strict";
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3000";
const out = path.resolve(process.env.QA_OUTPUT_DIR || ".qa");
await mkdir(out, { recursive: true });
const child = process.env.QA_BASE_URL ? null : spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-H", "0.0.0.0", "-p", "3000"], { stdio: "pipe" });
let serverLog = "";
child?.stdout.on("data", data => { serverLog += data; });
child?.stderr.on("data", data => { serverLog += data; });
let browser;
const report = { base, pages: [] };
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try { ready = (await fetch(base, { signal: AbortSignal.timeout(2000) })).ok; } catch {}
    if (ready) break;
    await delay(500);
  }
  assert(ready, "Production server is reachable: " + serverLog);
  browser = await chromium.launch({ headless: true });
  for (const viewport of [{ width: 1440, height: 960 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 320, height: 800 }]) {
    const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
    page.setDefaultTimeout(15000);
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const route of ["/", "/gaming-kassel", "/speisekarte", "/faq", "/links", "/impressum", "/datenschutz"]) {
      console.log("Checking", viewport.width, route);
      const response = await page.goto(base + route, { waitUntil: "domcontentloaded" });
      assert.equal(response.status(), 200, route);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").count(), 1, "one H1: " + route);
      const size = await page.evaluate(() => ({ width: innerWidth, document: document.documentElement.scrollWidth }));
      assert(size.document <= size.width + 1, "Horizontal overflow: " + route + " at " + viewport.width);
      if (route === "/" || route === "/gaming-kassel") {
        assert((await page.locator("h1").innerText()).includes("Gaming"), "Gaming in primary heading");
        // Trigger reveal animations and lazy media before capturing the full layout.
        for (const section of await page.locator("main > section").all()) {
          await section.scrollIntoViewIfNeeded();
          await page.waitForTimeout(150);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(400);
        await page.screenshot({ path: path.join(out, (route === "/" ? "home" : "gaming") + "-" + viewport.width + ".png"), fullPage: true });
      }
      const broken = await page.locator("main img").evaluateAll(imgs => imgs.filter(img => img.complete && !img.naturalWidth).map(img => img.src));
      assert.deepEqual(broken, [], "No broken images: " + route);
      report.pages.push({ route, viewport: viewport.width, status: response.status() });
    }
    await page.goto(base + "/", { waitUntil: "domcontentloaded" });
    if (viewport.width < 1024) {
      await page.getByRole("button", { name: "Menü öffnen", exact: true }).click();
      await page.locator("#mobile-primary-nav").getByRole("link", { name: "Gaming", exact: true }).click();
      await page.waitForURL("**/gaming-kassel");
      assert.equal(await page.locator("#mobile-primary-nav").count(), 0, "Mobile navigation closes");
    } else {
      await page.locator("header").getByRole("link", { name: "Gaming", exact: true }).click();
      await page.waitForURL("**/gaming-kassel");
    }
    await page.getByRole("link", { name: "Gaming-Abend anfragen", exact: true }).click();
    await page.waitForURL("**/#reservation");
    await page.locator("#reservation").scrollIntoViewIfNeeded();
    await page.getByLabel("Dein Name", { exact: true }).fill("QA Gast");
    await page.getByLabel("E-Mail", { exact: true }).fill("qa@example.com");
    await page.getByLabel("Nachricht (optional)", { exact: true }).fill("Wir möchten gemeinsam PlayStation spielen.");
    const arrival = new Date(); arrival.setDate(arrival.getDate() + 2);
    await page.getByLabel("Datum des Abends", { exact: true }).fill(arrival.toISOString().slice(0, 10));
    let intercepted = false;
    await page.route("**/api/reservations", async route => {
      const payload = route.request().postDataJSON();
      assert.equal(payload.name, "QA Gast");
      assert(payload.message.includes("PlayStation"));
      intercepted = true;
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ code: "sent" }) });
    });
    await page.getByRole("button", { name: "Reservierungsanfrage senden", exact: true }).click();
    await page.getByRole("status").filter({ hasText: /Anfrage/ }).waitFor();
    assert(intercepted, "Reservation request contract verified without sending an email");
    await page.screenshot({ path: path.join(out, "reservation-" + viewport.width + ".png") });
    assert.deepEqual(errors, [], "No browser exceptions at " + viewport.width + "px");
    await page.close();
  }
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const page = await noJs.newPage();
  await page.goto(base + "/gaming-kassel");
  assert((await page.locator("main").innerText()).includes("PlayStation"));
  assert.equal(await page.getByRole("link", { name: "Gaming-Abend anfragen", exact: true }).getAttribute("href"), "/#reservation");
  await noJs.close();
  for (const route of ["/robots.txt", "/sitemap.xml", "/llms.txt", "/llms-full.txt", "/bc31e9278a5d48c8af2f301eb4a71690.txt"]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
  }
  await writeFile(path.join(out, "browser-report.json"), JSON.stringify(report, null, 2));
  console.log("Browser QA passed:", report.pages.length, "page/viewport combinations; gaming navigation, mocked reservation, no-JS content and crawler resources.");
} finally {
  if (browser) await browser.close();
  child?.kill("SIGTERM");
}
