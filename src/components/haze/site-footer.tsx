"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { WebsiteCredit } from "@/components/haze/website-credit";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-[#050505]/90 py-12 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between md:items-start md:text-left">
        <div>
          <p className="font-display text-lg font-semibold text-white">
            {t.footer.copyright}
          </p>
          <p className="mt-1 text-sm text-violet-300/60">{t.footer.region}</p>
        </div>
        <div className="flex flex-col items-center gap-3 md:items-end">
          <Link
            href="https://www.instagram.com/haze_and_chill_cafe/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-violet-100/90 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
          >
            <Instagram className="h-4 w-4" strokeWidth={1.75} />
            @haze_and_chill_cafe
          </Link>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-violet-400/70 md:justify-end"
            aria-label="Legal"
          >
            <Link href="/gaming-kassel" className="inline-flex min-h-11 items-center transition-colors hover:text-emerald-300/90">Gaming Lounge</Link>
            <span className="text-violet-600/60" aria-hidden>·</span>
            <Link href="/speisekarte" className="transition-colors hover:text-emerald-300/90">
              {t.menu.title}
            </Link>
            <span className="text-violet-600/60" aria-hidden>·</span>
            <Link
              href="/links"
              className="transition-colors hover:text-emerald-300/90"
            >
              {t.links.navLabel}
            </Link>
            <span className="text-violet-600/60" aria-hidden>
              ·
            </span>
            <Link
              href="/faq"
              className="transition-colors hover:text-emerald-300/90"
            >
              FAQ
            </Link>
            <span className="text-violet-600/60" aria-hidden>
              ·
            </span>
            <Link
              href="/#contact"
              className="transition-colors hover:text-emerald-300/90"
            >
              Kontakt & Anfahrt
            </Link>
            <span className="text-violet-600/60" aria-hidden>
              ·
            </span>
            <Link
              href="/impressum"
              className="transition-colors hover:text-emerald-300/90"
            >
              {t.footer.legalImpressum}
            </Link>
            <span className="text-violet-600/60" aria-hidden>
              ·
            </span>
            <Link
              href="/datenschutz"
              className="transition-colors hover:text-emerald-300/90"
            >
              {t.footer.legalPrivacy}
            </Link>
          </nav>
          <WebsiteCredit />
          <p className="text-xs text-violet-500/50">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
