"use client";

import { useLanguage } from "@/i18n/language-provider";
import Link from "next/link";
import { siteLegal } from "@/config/site-legal";
import { seoConfig } from "@/lib/seo";

const pageCopy = {
  de: {
    "title": "Dein Abend bei Haze and Chill",
    "intro": "Nach Feierabend noch eine Runde zocken oder mit Freunden einen Drink genießen? Haze & Chill verbindet Café und Gaming Lounge in der Kasseler Innenstadt: PlayStation, hausgemachter Eistee, Cocktails und Snacks, umgeben von Street Art und Neon.",
    "foodTitle": "Getränke und Speisen",
    "foodBody": "Espresso, Cappuccino oder ein Cocktail zum Abend: Die Karte umfasst auch alkoholfreie Cocktails, Fruchtbecher, Toasts, Nachos und Ramen.",
    "fullMenu": "Vollständige Speisekarte mit Preisen",
    "gamingTitle": "Gaming in Kassel – mit deiner Crew",
    "gamingBody": "Gemeinsam an der PlayStation spielen, zwischendurch einen Shake trinken und danach auf der Terrasse weiterquatschen. Frag für euren Gaming-Abend einen Tisch an und stimmt die Konsolennutzung mit dem Team ab.",
    "exploreGaming": "Gaming Lounge entdecken",
    "address": "Adresse und Öffnungszeiten",
    "hours": "Täglich 17:00–02:00 Uhr (bis Ende).",
    "directions": "Anfahrt auf Google Maps",
    "newTab": " (öffnet in einem neuen Tab)",
    "faq": "Fragen zum Besuch"
  },
  en: {
    "title": "Your evening at Haze & Chill",
    "intro": "Fancy a game after work or a drink with friends? Haze & Chill combines a café and gaming lounge in downtown Kassel, with PlayStation, homemade iced tea, cocktails and snacks amid street art and neon lights.",
    "foodTitle": "Food and drinks",
    "foodBody": "Stop by for an espresso, cappuccino or cocktail. We also serve alcohol-free cocktails, fruit cups, toasties, nachos and ramen.",
    "fullMenu": "Full menu and prices",
    "gamingTitle": "Gaming with friends in Kassel",
    "gamingBody": "Play together on PlayStation, grab a shake and catch up on the terrace afterwards. Request a table for your gaming night and check console availability with our team.",
    "exploreGaming": "Explore the gaming lounge",
    "address": "Address and opening hours",
    "hours": "Open daily from 5 pm to 2 am (closing time).",
    "directions": "Directions on Google Maps",
    "newTab": " (opens in a new tab)",
    "faq": "Visitor FAQs"
  },
};

export function LocalSeoSections() {
  const { locale } = useLanguage();
  const copy = pageCopy[locale];
  return <section id="about" className="border-t border-white/5 bg-[#090909] py-20 sm:py-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{copy.title}</h2>
        <p className="mt-4 leading-relaxed text-violet-100/80">{copy.intro}</p>
      </header>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="font-display text-xl font-semibold text-emerald-200">{copy.foodTitle}</h3>
          <p className="mt-3 text-violet-100/80">{copy.foodBody}</p>
          <Link href="/speisekarte" className="mt-4 inline-flex min-h-11 items-center text-sm text-emerald-300 underline underline-offset-4">{copy.fullMenu}</Link>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="font-display text-xl font-semibold text-emerald-200">{copy.gamingTitle}</h3>
          <p className="mt-3 text-violet-100/80">{copy.gamingBody}</p>
          <Link href="/gaming-kassel" className="mt-4 inline-flex min-h-11 items-center text-sm text-emerald-300 underline underline-offset-4">{copy.exploreGaming}</Link>
        </article>
      </div>
      <article id="contact" className="mt-8 scroll-mt-24 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6">
        <h3 className="font-display text-xl font-semibold text-white">{copy.address}</h3>
        <address className="mt-3 not-italic text-violet-50/90">{siteLegal.tradeName}<br />{siteLegal.addressLine1}<br />{siteLegal.addressLine2}</address>
        <p className="mt-3 font-medium text-emerald-200">{copy.hours}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <a href={seoConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-emerald-300 underline underline-offset-4">{copy.directions}<span className="sr-only">{copy.newTab}</span></a>
          <Link href="/faq" className="inline-flex min-h-11 items-center text-emerald-300 underline underline-offset-4">{copy.faq}</Link>
        </div>
      </article>
    </div>
  </section>;
}
