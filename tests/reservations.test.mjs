import test, { mock } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { validateReservation } from "../src/lib/reservation-validation.ts";
import { reservationMail } from "../src/lib/reservation-mail.ts";
import { POST } from "../src/app/api/reservations/route.ts";

const nodemailer = createRequire(import.meta.url)("nodemailer");

const now = new Date("2026-10-10T16:00:00Z");
const valid = { name: "Test Gast", email: "guest@example.com", phone: "", date: "2026-10-11", time: "19:00", guests: 2, message: "Fensterplatz?", website: "" };

test("Berlin arrival dates include the following night and reject elapsed times", () => {
  const night = validateReservation({ ...valid, date: "2026-10-10", time: "00:30" }, now);
  assert.equal(night.ok, true);
  assert.equal(night.data.arrivalDate, "2026-10-11");
  assert.equal(validateReservation({ ...valid, date: "2026-10-10", time: "17:30" }, now).error, "time");
  assert.equal(validateReservation({ ...valid, time: "02:00" }, now).error, "time");
  assert.equal(validateReservation({ ...valid, date: "2026-10-09" }, now).error, "date");
});

test("server validation rejects invalid calendar dates, header injection and invalid guest counts", () => {
  for (const changes of [{ date: "2026-02-30" }, { name: "Gast\r\nBcc:evil@example.com" },
    { email: "guest@example.com\r\nBcc:evil@example.com" }, { guests: 0 }, { guests: 1.5 },
    { guests: "2" }, { message: "x".repeat(1001) }, { phone: "<script>" }]) {
    assert.equal(validateReservation({ ...valid, ...changes }, now).ok, false);
  }
});

test("request email carries both evening and actual arrival date, without claiming confirmation", () => {
  const { data } = validateReservation({ ...valid, date: "2026-10-10", time: "01:00" }, now);
  const mail = reservationMail(data, "abc12345-6789");
  assert(mail.text.includes("noch nicht bestätigt"));
  assert(mail.text.includes("Samstag, 10. Oktober 2026"));
  assert(mail.text.includes("Sonntag, 11. Oktober 2026, 01:00"));
  assert(!("html" in mail));
});

test("HTTP → SMTP request contract, failures, abuse controls and fixed recipients", async context => {
  const envNames = ["SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "RESERVATION_RECIPIENT_EMAIL"];
  const original = Object.fromEntries(envNames.map(key => [key, process.env[key]]));
  Object.assign(process.env, { SMTP_HOST: "smtp.example.com", SMTP_PORT: "465", SMTP_SECURE: "true",
    SMTP_USER: "sender@example.com", SMTP_PASS: "fixture-password", RESERVATION_RECIPIENT_EMAIL: "info@naser-solutions.de" });
  delete process.env.SMTP_FROM;
  const tomorrow = new Date(); tomorrow.setUTCDate(tomorrow.getUTCDate() + 2);
  const payload = { ...valid, date: tomorrow.toISOString().slice(0, 10) };
  const sent = [];
  let failure = false, rejected = false, sequence = 0;
  const smtp = mock.method(nodemailer, "createTransport", options => {
    assert.equal(options.secure, true);
    assert.equal(options.disableFileAccess, true);
    return { sendMail: async message => {
      if (failure) throw new Error("SMTP credentials must not reach client");
      sent.push(message);
      return { accepted: rejected ? [] : [message.to.address, message.cc.address] };
    }, close() {} };
  });
  const logs = mock.method(console, "error", () => {});
  function request(body = payload, { origin = "https://www.haze-chill.com", ip = `192.0.2.${++sequence}`, raw = false, type = "application/json" } = {}) {
    return new Request("https://www.haze-chill.com/api/reservations", { method: "POST",
      headers: { Origin: origin, "Content-Type": type, "x-vercel-forwarded-for": ip }, body: raw ? body : JSON.stringify(body) });
  }
  try {
    await context.test("valid request sends to the existing recipient and fixed iCloud copy, using guest as Reply-To", async () => {
      const response = await POST(request({ ...payload, to: "evil@example.com", cc: "evil@example.com" }));
      assert.equal(response.status, 200); assert.equal((await response.json()).code, "sent");
      assert.equal(sent.length, 1); assert.equal(sent[0].to.address, "info@naser-solutions.de");
      assert.equal(sent[0].cc.address, "habibhayati85@icloud.com");
      assert.equal(sent[0].replyTo.address, valid.email); assert.equal(sent[0].from.address, "sender@example.com");
    });
    await context.test("iCloud copy remains present with a configured recipient or the default recipient", async () => {
      process.env.RESERVATION_RECIPIENT_EMAIL = "reservations@example.com";
      assert.equal((await POST(request())).status, 200);
      assert.equal(sent.at(-1).to.address, "reservations@example.com");
      assert.equal(sent.at(-1).cc.address, "habibhayati85@icloud.com");
      delete process.env.RESERVATION_RECIPIENT_EMAIL;
      assert.equal((await POST(request())).status, 200);
      assert.equal(sent.at(-1).to.address, "info@naser-solutions.de");
      assert.equal(sent.at(-1).cc.address, "habibhayati85@icloud.com");
      process.env.RESERVATION_RECIPIENT_EMAIL = "info@naser-solutions.de";
    });
    await context.test("foreign origin, malformed payload, honeypot and oversized body never send email", async () => {
      const before = sent.length;
      assert.equal((await POST(request(payload, { origin: "https://evil.example" }))).status, 403);
      assert.equal((await POST(request({ ...payload, email: "invalid" }))).status, 400);
      assert.equal((await POST(request({ ...payload, website: "bot" }))).status, 400);
      assert.equal((await POST(request("x".repeat(9000), { raw: true }))).status, 400);
      assert.equal((await POST(request("{", { raw: true }))).status, 400);
      assert.equal((await POST(request(payload, { type: "text/plain" }))).status, 415);
      assert.equal(sent.length, before);
    });
    await context.test("SMTP failures and missing configuration cannot produce a success message", async () => {
      failure = true;
      let response = await POST(request());
      assert.equal(response.status, 502); assert.deepEqual(await response.json(), { code: "delivery" });
      failure = false; rejected = true;
      assert.equal((await POST(request())).status, 502);
      rejected = false; delete process.env.SMTP_PASS;
      response = await POST(request());
      assert.equal(response.status, 503); assert.deepEqual(await response.json(), { code: "unavailable" });
      process.env.SMTP_PASS = "fixture-password";
    });
    await context.test("fourth request from the same IP is throttled", async () => {
      const before = sent.length;
      for (let i = 0; i < 3; i++) assert.equal((await POST(request(payload, { ip: "192.0.2.240" }))).status, 200);
      const response = await POST(request(payload, { ip: "192.0.2.240" }));
      assert.equal(response.status, 429); assert.equal((await response.json()).code, "rate");
      assert.equal(sent.length, before + 3);
    });
  } finally {
    smtp.mock.restore(); logs.mock.restore();
    for (const [key, value] of Object.entries(original)) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
  }
});
