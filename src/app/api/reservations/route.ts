import "server-only";
import { createHash, randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import { emailPattern, validateReservation } from "@/lib/reservation-validation";
import { reservationMail } from "@/lib/reservation-mail";
import { seoConfig } from "@/lib/seo";

export const runtime = "nodejs";
export const maxDuration = 30;

// Best-effort per-instance throttle. No contact details or raw IPs are retained.
const attempts = new Map<string, { count: number; expires: number }>();
const responses = (status: number, code: string) => Response.json({ code }, {
  status, headers: { "Cache-Control": "no-store" },
});

async function readBody(request: Request) {
  if (!request.body) throw new Error("empty");
  const reader = request.body.getReader();
  let bytes = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 8192) { await reader.cancel(); throw new Error("size"); }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const requestUrl = new URL(request.url);
  const allowedOrigins = new Set([seoConfig.baseUrl, requestUrl.origin]);
  if (process.env.VERCEL_URL) allowedOrigins.add(`https://${process.env.VERCEL_URL}`);
  if (process.env.NODE_ENV === "development") {
    const port = requestUrl.port || "3000";
    allowedOrigins.add(`http://127.0.0.1:${port}`);
    allowedOrigins.add(`http://localhost:${port}`);
  }
  if (!origin || !allowedOrigins.has(origin) || request.headers.get("sec-fetch-site") === "cross-site") {
    return responses(403, "origin");
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return responses(415, "invalid");
  let input: unknown;
  try { input = await readBody(request); } catch { return responses(400, "invalid"); }
  if (input && typeof input === "object" && "website" in input && input.website) return responses(400, "invalid");
  const validation = validateReservation(input);
  if (!validation.ok) return responses(400, validation.error);

  const host = process.env.SMTP_HOST?.trim(), user = process.env.SMTP_USER?.trim(), pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || "587");
  const secureValue = process.env.SMTP_SECURE?.trim().toLowerCase();
  const secure = secureValue ? secureValue === "true" : port === 465;
  const from = process.env.SMTP_FROM?.trim() || user;
  const to = process.env.RESERVATION_RECIPIENT_EMAIL?.trim() || "info@naser-solutions.de";
  if (!host || !user || !pass || !from || !emailPattern.test(from) || !emailPattern.test(to) ||
    !Number.isInteger(port) || port < 1 || port > 65535 || (secureValue && !["true", "false"].includes(secureValue))) {
    console.error("Reservation SMTP configuration is missing or invalid.");
    return responses(503, "unavailable");
  }
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const ip = request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const key = createHash("sha256").update(`${pass}:${ip}`).digest("hex");
  const bucket = attempts.get(key) ?? { count: 0, expires: now + 15 * 60 * 1000 };
  if (bucket.count >= 3 || attempts.size >= 5000) return responses(429, "rate");
  bucket.count++;
  attempts.set(key, bucket);

  const transporter = nodemailer.createTransport({
    host, port, secure, requireTLS: !secure, auth: { user, pass },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  try {
    const id = randomUUID();
    const result = await transporter.sendMail({
      from: { name: "Haze and Chill – Tischreservierung", address: from },
      to: { address: to, name: "Reservierungen Haze and Chill" },
      cc: { address: "habibhayati85@icloud.com", name: "Reservierungen Haze and Chill" },
      replyTo: { address: validation.data.email, name: validation.data.name },
      ...reservationMail(validation.data, id),
    });
    if (result.accepted.length === 0) throw new Error("rejected");
    return responses(200, "sent");
  } catch {
    // Never log submitted personal data, credentials or raw SMTP errors.
    console.error("Reservation email could not be accepted by the SMTP server.");
    return responses(502, "delivery");
  } finally { transporter.close(); }
}
