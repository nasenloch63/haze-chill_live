"use client";

import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { SiteFooter } from "@/components/haze/site-footer";
import { SiteNavbar } from "@/components/haze/site-navbar";
import { siteLegal } from "@/config/site-legal";
import { useLanguage } from "@/i18n/language-provider";

const copy = {
  de: {
    title: "Events im Haze & Chill",
    intro: "Unsere monatlichen Veranstaltungen im Café in Kassel.",
    livingSoilSchedule: "Jeden ersten Freitag im Monat",
    livingSoilBody: "Einmal im Monat veranstalten wir gemeinsam mit der Living Soil Crew einen Abend bei uns im Café.",
    livingSoilFlyer: "Kasseler Canna-Cup · Christmas Edition",
    livingSoilDate: "Freitag, 4. Dezember 2026, um 19 Uhr",
    dhvTitle: "Offenes Treffen der DHV-Ortsgruppe Kassel",
    dhvSchedule: "Jeden dritten Donnerstag im Monat",
    dhvBody: "Wir sind Gastgeber für die Kasseler Ortsgruppe des Deutschen Hanfverbands. Beim offenen Treffen kannst du die Ortsgruppe kennenlernen und dich mit ihr austauschen.",
    dhvFlyer: "Offenes Treffen im November",
    dhvDate: "Donnerstag, 19. November 2026, ab 19 Uhr",
    dhvLink: "Website der Ortsgruppe Kassel",
  },
  en: {
    title: "Events at Haze & Chill",
    intro: "Monthly events at our café in Kassel.",
    livingSoilSchedule: "First Friday of every month",
    livingSoilBody: "Once a month, we put on an evening at the café together with the Living Soil Crew.",
    livingSoilFlyer: "Kassel Canna Cup · Christmas Edition",
    livingSoilDate: "Friday, 4 December 2026 at 7 pm",
    dhvTitle: "Open meeting of the DHV Kassel local chapter",
    dhvSchedule: "Third Thursday of every month",
    dhvBody: "We host the Kassel chapter of the German Hemp Association. Come along to the open meeting to get to know the group and join the conversation.",
    dhvFlyer: "November open meeting",
    dhvDate: "Thursday, 19 November 2026 from 7 pm",
    dhvLink: "Kassel chapter website",
  },
};

export function EventsView() {
  const { locale } = useLanguage();
  const t = copy[locale];
  const events = [
    {
      title: "Living Soil Crew",
      schedule: t.livingSoilSchedule,
      body: t.livingSoilBody,
      flyer: t.livingSoilFlyer,
      date: t.livingSoilDate,
      dateTime: "2026-12-04T19:00:00+01:00",
      image: "/events/canna-cup-dezember.png",
      width: 1080,
      height: 1350,
    },
    {
      title: t.dhvTitle,
      schedule: t.dhvSchedule,
      body: t.dhvBody,
      flyer: t.dhvFlyer,
      date: t.dhvDate,
      dateTime: "2026-11-19T19:00:00+01:00",
      image: "/events/dhv-kassel-november.png",
      width: 1122,
      height: 1402,
      href: "https://www.dhvkassel.de/",
    },
  ];

  return (
    <>
      <SiteNavbar />
      <main className="bg-[#08060a] bg-[radial-gradient(ellipse_at_top_left,rgba(109,40,217,0.22),transparent_55%)] px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">{t.title}</h1>
          <p className="mt-4 text-base text-violet-100/75 sm:text-lg">{t.intro}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden />
            {siteLegal.addressLine1} · {siteLegal.addressLine2}
          </p>
          <div className="mt-9 grid gap-6 md:grid-cols-2">
            {events.map((event) => (
              <article key={event.image} className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
                <div className="flex flex-1 flex-col items-start p-5 sm:p-7">
                  <p className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                    <CalendarDays className="h-4 w-4 shrink-0" aria-hidden />
                    {event.schedule}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-bold text-white">{event.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-violet-100/75">{event.body}</p>
                  {event.href && (
                    <a href={event.href} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-violet-400/40 px-4 text-sm font-medium text-violet-100 transition-colors hover:border-emerald-400 hover:text-emerald-300">
                      {t.dhvLink}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </a>
                  )}
                </div>
                <figure className="border-t border-white/10 p-5 sm:p-7">
                  <figcaption className="mb-4">
                    <span className="block font-semibold text-white">{event.flyer}</span>
                    <time dateTime={event.dateTime} className="mt-1 block text-sm text-violet-100/75">{event.date}</time>
                  </figcaption>
                  <Image src={event.image} alt="" width={event.width} height={event.height} sizes="(min-width: 768px) 450px, 90vw" className="h-auto w-full rounded-xl" />
                </figure>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
