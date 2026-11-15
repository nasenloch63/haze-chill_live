"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { googleReviews, googleReviewsUrl } from "@/data/google-reviews";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/language-provider";

function Stars({ count, ariaLabel }: { count: number; ariaLabel: string }) {
  return (
    <div className="flex gap-0.5 text-amber-400" role="img" aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < count ? "fill-amber-400 text-amber-400" : "fill-transparent text-white/20")}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function GoogleReviewsWall() {
  const { locale, t } = useLanguage();

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-20 border-t border-white/5 bg-[#080808] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="text-center">
          <h2 id="reviews-heading" className="font-display text-3xl font-bold text-white sm:text-4xl">
            {t.reviews.title}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-violet-200/65">{t.reviews.subtitle}</p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {googleReviews.map((review) => (
            <article key={review.id} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6">
              <Stars count={review.rating} ariaLabel={t.reviews.starsAria(review.rating)} />
              <blockquote lang={locale} className="mt-5 flex-1 whitespace-pre-line text-base leading-relaxed text-violet-100/90">
                {locale === "en" ? `“${review.translation}”` : `„${review.text}“`}
              </blockquote>
              {locale === "en" && <p className="mt-2 text-xs text-violet-200/70">Translated from German</p>}
              <p className="mt-6 font-semibold text-white">{review.name}</p>
              <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 w-fit items-center gap-1.5 text-xs text-emerald-300/80 transition-colors hover:text-emerald-200">
                {t.reviews.googleBadge}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                <span className="sr-only">{t.links.newTab}</span>
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm text-violet-100 transition-colors hover:border-emerald-400/40 hover:text-emerald-300">
            {t.reviews.readAll}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only">{t.links.newTab}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
