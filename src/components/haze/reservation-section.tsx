"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CalendarDays, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/language-provider";
import { reservationCopy } from "@/i18n/reservation-copy";
import { berlinDate, hasReservationNotice, reservationTimes, validateReservation } from "@/lib/reservation-validation";
import { seoConfig } from "@/lib/seo";

const inputClass = "mt-2 w-full min-h-12 rounded-xl border border-white/15 bg-[#101014] px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-violet-200/40 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 disabled:opacity-60";
type ErrorCode = keyof typeof reservationCopy.de.errors;

export function ReservationSection() {
  const { locale } = useLanguage();
  const copy = reservationCopy[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<ErrorCode>("delivery");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("19:00");
  const [clock, setClock] = useState<Date | null>(null);
  useEffect(() => {
    const initial = setTimeout(() => setClock(new Date()), 0);
    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => { clearTimeout(initial); clearInterval(timer); };
  }, []);
  const hasNotice = clock !== null && hasReservationNotice(selectedDate, selectedTime, clock);
  const pending = useRef(false);
  const feedback = useRef<HTMLDivElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload = {
      name: fields.get("name"), email: fields.get("email"), phone: fields.get("phone"),
      date: fields.get("date"), time: fields.get("time"), guests: Number(fields.get("guests")),
      message: fields.get("message"), website: fields.get("website"),
    };
    const validation = validateReservation(payload);
    if (!validation.ok) {
      setError(validation.error);
      setStatus("error");
      requestAnimationFrame(() => feedback.current?.focus());
      return;
    }
    pending.current = true;
    setStatus("sending");
    try {
      const response = await fetch("/api/reservations", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(35000),
      });
      const result = await response.json() as { code?: string };
      if (response.ok && result.code === "sent") {
        form.reset();
        setSelectedDate("");
        setSelectedTime("19:00");
        setStatus("sent");
      } else {
        setError(result.code && result.code in copy.errors ? result.code as ErrorCode : "delivery");
        setStatus("error");
      }
    } catch { setError("network"); setStatus("error"); }
    finally {
      pending.current = false;
      requestAnimationFrame(() => feedback.current?.focus());
    }
  }

  return <section id="reservation" aria-labelledby="reservation-heading" className="relative scroll-mt-20 border-t border-white/5 bg-[#08090b] py-20 sm:py-28">
    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(16,185,129,0.07),transparent_60%)]" />
    <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
      <header>
        <CalendarDays aria-hidden className="h-8 w-8 text-emerald-300" strokeWidth={1.5} />
        <p className="mt-5 text-sm font-medium text-emerald-300">{copy.eyebrow}</p>
        <h2 id="reservation-heading" className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">{copy.title}</h2>
        <p className="mt-5 max-w-md leading-relaxed text-violet-100/80">{copy.intro}</p>
        <p className="mt-5 text-sm font-medium text-emerald-200">{copy.hours}</p>
        <p className="mt-4 max-w-md rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-violet-100/75">{copy.notice}</p>
      </header>
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
        <div ref={feedback} tabIndex={-1} className="outline-none" aria-live="polite" aria-atomic="true">
          {status === "sent" ? <div role="status" aria-live="polite" className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-5 text-emerald-100">
            <CheckCircle2 aria-hidden className="mb-3 h-7 w-7 text-emerald-300" />
            <p>{copy.success}</p>
            <Button type="button" variant="outline" className="mt-5" onClick={() => setStatus("idle")}>{copy.another}</Button>
          </div> : null}
          {status === "error" ? <div role="alert" className="mb-5 rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-100">
            <p className="font-semibold">{copy.errorTitle}</p><p className="mt-1">{copy.errors[error]}</p>
            {["delivery", "unavailable", "network"].includes(error) ? <a href={seoConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center underline underline-offset-4">Instagram<span className="sr-only"> ({locale === "de" ? "öffnet in einem neuen Tab" : "opens in a new tab"})</span></a> : null}
          </div> : null}
        </div>
        {status !== "sent" ? <form onSubmit={submit} aria-busy={status === "sending"}>
          <p className="mb-5 text-xs leading-relaxed text-violet-200/60">{copy.required}</p>
          <fieldset disabled={status === "sending"} className="grid gap-5 sm:grid-cols-2">
            <legend className="sr-only">{copy.title}</legend>
            <label htmlFor="reservation-name" className="text-sm text-violet-100 sm:col-span-2">{copy.name}<input id="reservation-name" name="name" autoComplete="name" required minLength={2} maxLength={100} className={inputClass} /></label>
            <label htmlFor="reservation-email" className="text-sm text-violet-100">{copy.email}<input id="reservation-email" name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} /></label>
            <label htmlFor="reservation-phone" className="text-sm text-violet-100">{copy.phone}<input id="reservation-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} className={inputClass} /></label>
            <label htmlFor="reservation-date" className="min-w-0 text-sm text-violet-100">{copy.date}<input id="reservation-date" name="date" type="date" required value={selectedDate} min={clock ? berlinDate(clock) : undefined} onChange={event => { setSelectedDate(event.target.value); setClock(new Date()); }} aria-describedby="reservation-night" className={`${inputClass} [color-scheme:dark]`} /></label>
            <label htmlFor="reservation-time" className="text-sm text-violet-100">{copy.time}<select id="reservation-time" name="time" required value={selectedTime} onChange={event => setSelectedTime(event.target.value)} aria-describedby="reservation-night" className={inputClass}>{reservationTimes.map(time => <option key={time} value={time} disabled={!clock || !hasReservationNotice(selectedDate, time, clock)}>{time}</option>)}</select></label>
            <p id="reservation-night" className="-mt-2 text-xs leading-relaxed text-violet-200/60 sm:col-span-2">{copy.nightHint}</p>
            <label htmlFor="reservation-guests" className="text-sm text-violet-100">{copy.guests}<input id="reservation-guests" name="guests" type="number" inputMode="numeric" required min={1} max={50} step={1} defaultValue={2} className={inputClass} /></label>
            <label htmlFor="reservation-message" className="text-sm text-violet-100 sm:col-span-2">{copy.message}<textarea id="reservation-message" name="message" rows={3} maxLength={1000} placeholder={copy.messageHint} className={`${inputClass} resize-y`} /></label>
            <div aria-hidden className="hidden"><label htmlFor="reservation-website">Website</label><input id="reservation-website" name="website" tabIndex={-1} autoComplete="off" /></div>
            <p className="text-xs leading-relaxed text-violet-200/60 sm:col-span-2">{copy.privacyBefore} <Link href="/datenschutz#reservations" className="text-emerald-300 underline underline-offset-4">{copy.privacyLink}</Link>{copy.privacyAfter}</p>
            {selectedDate && !hasNotice ? <p role="status" className="text-sm text-amber-200 sm:col-span-2">{copy.errors.notice}</p> : null}
            <Button type="submit" disabled={!hasNotice || status === "sending"} className="w-full whitespace-normal sm:col-span-2">{status === "sending" ? <LoaderCircle className="animate-spin" aria-hidden /> : <Send aria-hidden />}{status === "sending" ? copy.sending : copy.submit}</Button>
          </fieldset>
        </form> : null}
      </div>
    </div>
  </section>;
}
