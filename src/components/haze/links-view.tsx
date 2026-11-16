"use client";

import Link from "next/link";
import { TikTokIcon } from "@/components/haze/tiktok-icon";
import { ArrowUpRight, Globe, Facebook, Instagram, MapPin, UtensilsCrossed } from "lucide-react";
import { FACEBOOK_URL, TIKTOK_URL } from "@/lib/social-links";
import { GradientLogoMark } from "@/components/haze/gradient-logo-mark";
import { LanguageToggle } from "@/components/haze/language-toggle";
import { useLanguage } from "@/i18n/language-provider";
import { WebsiteCredit } from "@/components/haze/website-credit";

export function LinksView() {
  const { t } = useLanguage();
  const links = [
    {
      href: "/speisekarte.pdf",
      title: t.links.menu,
      description: t.links.menuDescription,
      icon: UtensilsCrossed,
      className:
        "border-emerald-400/35 bg-emerald-500/10 hover:border-emerald-300/60 hover:bg-emerald-500/15",
      iconClassName: "bg-emerald-400/10 text-emerald-300",
    },
    {
      href: "https://www.instagram.com/haze_and_chill_cafe/",
      title: "Instagram",
      description: "@haze_and_chill_cafe",
      icon: Instagram,
      className:
        "border-violet-400/25 bg-violet-500/10 hover:border-violet-300/50 hover:bg-violet-500/15",
      iconClassName: "bg-violet-400/10 text-violet-300",
    },
    {
      href: FACEBOOK_URL,
      title: "Facebook",
      description: "Haze & Chill Café",
      icon: Facebook,
      className:
        "border-violet-400/25 bg-violet-500/10 hover:border-violet-300/50 hover:bg-violet-500/15",
      iconClassName: "bg-violet-400/10 text-violet-300",
    },
    {
      href: TIKTOK_URL,
      title: "TikTok",
      description: "@haze_and_chill_cafe",
      icon: TikTokIcon,
      className:
        "border-violet-400/25 bg-violet-500/10 hover:border-violet-300/50 hover:bg-violet-500/15",
      iconClassName: "bg-violet-400/10 text-violet-300",
    },
    {
      href: "https://maps.app.goo.gl/gEjB6Sn8PR39p6YH7",
      title: "Google Maps",
      description: t.links.mapsDescription,
      icon: MapPin,
      className:
        "border-white/15 bg-white/[0.04] hover:border-emerald-300/40 hover:bg-white/[0.07]",
      iconClassName: "bg-white/5 text-emerald-300",
    },
  ];

  return (
    <div className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#08060a]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_10%,rgba(109,40,217,0.2),transparent_55%),radial-gradient(ellipse_at_85%_85%,rgba(16,185,129,0.12),transparent_50%)]"
      />
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-violet-200/60">
          Kassel · Hessen
        </span>
        <LanguageToggle />
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-8 sm:py-12">
        <div className="text-center">
          <Link href="/" aria-label={t.links.website} className="mx-auto block w-fit">
            <GradientLogoMark
              maskAlign="center"
              className="h-24 w-64 sm:h-28 sm:w-72"
              style={{ filter: "drop-shadow(0 0 24px rgba(139,92,246,0.3))" }}
            />
          </Link>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.25em] text-emerald-300/80">
            Café · Coffeeshop · Lounge
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Haze &amp; Chill
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-violet-200/70">
            {t.links.intro}
          </p>
        </div>

        <nav aria-label={t.links.navLabel} className="mt-8">
          <ul className="space-y-3">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex min-h-20 items-center gap-4 rounded-2xl border px-4 py-4 transition-colors ${link.className}`}
                  >
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${link.iconClassName}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-base font-semibold text-white">
                        {link.title}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-violet-100/65">
                        {link.description}
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-violet-200/50 transition-colors group-hover:text-white" aria-hidden />
                    <span className="sr-only">{t.links.newTab}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href="/"
          className="mx-auto mt-7 inline-flex min-h-11 items-center gap-2 text-sm text-violet-200/70 transition-colors hover:text-emerald-300"
        >
          <Globe className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          {t.links.website}
        </Link>
      </main>

      <footer className="px-5 pb-6 pt-4 text-center text-xs text-violet-200/60">
        <nav aria-label={t.links.footerNavLabel} className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link href="/impressum" className="inline-flex min-h-11 items-center transition-colors hover:text-emerald-300">
            {t.footer.legalImpressum}
          </Link>
          <Link href="/datenschutz" className="inline-flex min-h-11 items-center transition-colors hover:text-emerald-300">
            {t.footer.legalPrivacy}
          </Link>
        </nav>
        <div className="mt-3">
          <WebsiteCredit />
        </div>
      </footer>
    </div>
  );
}
