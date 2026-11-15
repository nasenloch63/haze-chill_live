"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { faqItems, faqItemsEn } from "@/data/faq-items";

export function FaqSection() {
  const { locale, t } = useLanguage();

  return (
    <section id="faq" className="bg-[#09070e]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-violet-300/80 transition-colors hover:text-emerald-300"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          {t.legal.backHome}
        </Link>

        <header className="mx-auto max-w-3xl pt-10 text-center">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            {locale === "en" ? "Visitor FAQs" : "Fragen zu deinem Besuch"}
          </h1>
          <p className="mt-3 text-violet-200/70">
            {locale === "en" ? "Address, opening hours, menu and answers about the café and lounge." : "Adresse, Öffnungszeiten, Speisekarte und Antworten zum Café und zur Lounge."}
          </p>
        </header>

        <p className="mt-6 text-center"><Link href="/speisekarte" className="text-emerald-300 underline underline-offset-4">{t.menu.fullMenuCta}</Link></p>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 pb-4 sm:gap-5 sm:pb-0">
          {(locale === "en" ? faqItemsEn : faqItems).map((item) => (
            <details
              key={item.question}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left"
            >
              <summary className="cursor-pointer list-none font-display text-lg font-semibold text-emerald-200 marker:content-none">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-violet-100/85">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
