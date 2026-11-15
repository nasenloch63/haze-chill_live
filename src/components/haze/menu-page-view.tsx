"use client";

import { useLanguage } from "@/i18n/language-provider";
import Link from "next/link";
import { SiteNavbar } from "@/components/haze/site-navbar";
import { SiteFooter } from "@/components/haze/site-footer";
import { translateMenuText } from "@/i18n/menu-copy";
import { menuData } from "@/data/menu-data";

const categoryId = (index: number) => `kategorie-${index + 1}`;

const pageCopy = {
  de: {
    "breadcrumb": "Speisekarte",
    "title": "Speisekarte & Preise",
    "intro": "Kaffee, Cocktails, Snacks und Desserts in der Kölnischen Str. 12-14, 34117 Kassel. Wir sind täglich von 17:00 bis 02:00 Uhr (bis Ende) für dich da.",
    "pdf": "Original-Speisekarte als PDF",
    "newTab": " (öffnet in einem neuen Tab)",
    "allergenInfo": "Alle Preise in Euro. Die Zahlen in eckigen Klammern sind Kennzeichnungen aus der Originalkarte; die Legende zu Allergenen und Zusatzstoffen findest du im PDF. Bei Fragen hilft dir unser Team vor Ort.",
    "questions": "Noch Fragen? ",
    "faq": "Antworten zum Besuch",
    "directions": "Öffnungszeiten und Anfahrt"
  },
  en: {
    "breadcrumb": "Menu",
    "title": "Menu & prices",
    "intro": "Coffee, cocktails, snacks and desserts at Kölnische Str. 12–14, 34117 Kassel. Open daily from 5 pm to 2 am (closing time).",
    "pdf": "Original menu PDF (German)",
    "newTab": " (opens in a new tab)",
    "allergenInfo": "All prices are in euros. Numbers in square brackets refer to the original menu. See the PDF for the allergen and additive key, or ask our team.",
    "questions": "Any questions? ",
    "faq": "Visitor FAQs",
    "directions": "Opening hours and directions"
  },
};

export function MenuPageView() {
  const { locale } = useLanguage();
  const copy = pageCopy[locale];
  return <>
    <SiteNavbar />
    <main className="bg-[#090909] px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <nav aria-label={locale === "en" ? "Breadcrumb" : "Brotkrümelnavigation"} className="text-sm text-violet-200/70">
          <Link href="/" className="hover:text-emerald-300">Haze and Chill</Link>
          <span aria-hidden className="mx-2">/</span><span>{copy.breadcrumb}</span>
        </nav>
        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-medium text-emerald-300">Haze and Chill · Kassel</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">{copy.title}</h1>
          <p className="mt-4 leading-relaxed text-violet-100/80">{copy.intro}</p>
          <a href="/speisekarte.pdf" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-5 py-2 text-sm text-emerald-200 hover:bg-emerald-500/20">{copy.pdf}<span className="sr-only">{copy.newTab}</span></a>
          <p className="mt-4 text-sm text-violet-200/60">{copy.allergenInfo}</p>
        </header>
        <nav aria-label={locale === "en" ? "Menu categories" : "Kategorien der Speisekarte"} className="mt-10 flex flex-wrap gap-2">
          {menuData.map((category, index) => <a key={category.category} href={`#${categoryId(index)}`} className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 py-2 text-sm text-violet-100 hover:border-emerald-400/40 hover:text-emerald-200">{translateMenuText(category.category, locale)}</a>)}
        </nav>
        <div className="mt-12 grid items-start gap-6 md:grid-cols-2">
          {menuData.map((category, index) => <section key={category.category} id={categoryId(index)} aria-labelledby={`${categoryId(index)}-heading`} className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h2 id={`${categoryId(index)}-heading`} className="font-display text-2xl font-semibold text-emerald-200">{translateMenuText(category.category, locale)}</h2>
            {category.notes ? <p className="mt-3 text-sm text-violet-100/70">{translateMenuText(category.notes, locale)}</p> : null}
            <ul className="mt-4">
              {category.items.map(item => <li key={item.name} className="flex items-baseline justify-between gap-4 border-b border-white/5 py-3 last:border-0">
                <div className="min-w-0"><h3 className="font-medium text-white">{translateMenuText(item.name, locale)}</h3>{item.description ? <p className="mt-1 text-sm text-violet-200/60">{translateMenuText(item.description, locale)}</p> : null}</div>
                <span className="shrink-0 font-semibold tabular-nums text-emerald-300">{item.price}</span>
              </li>)}
            </ul>
          </section>)}
        </div>
        <p className="mt-10 text-sm text-violet-200/70">{copy.questions}<Link href="/faq" className="text-emerald-300 underline underline-offset-4">{copy.faq}</Link> · <Link href="/#location" className="text-emerald-300 underline underline-offset-4">{copy.directions}</Link></p>
      </div>
    </main>
    <SiteFooter />
  </>;
}
