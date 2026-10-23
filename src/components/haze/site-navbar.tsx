"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Instagram,
  MapPin,
  Menu,
  Palette,
  Gamepad2,
  Star,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { LanguageToggle } from "@/components/haze/language-toggle";
import {
  GlowMenuBar,
  useActiveHash,
  type GlowMenuItem,
} from "@/components/ui/glow-menu";
import { cn } from "@/lib/utils";
import { GradientLogoMark } from "@/components/haze/gradient-logo-mark";

export function SiteNavbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const activeHash = useActiveHash();
  const hashBase = pathname === "/" ? "" : "/";
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const glowItems: GlowMenuItem[] = [
    {
      icon: UtensilsCrossed,
      label: t.nav.menu,
      href: `${hashBase}#menu`,
      gradient:
        "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.35) 0%, rgba(16,185,129,0.12) 42%, transparent 68%)",
      iconActiveClass: "text-emerald-400",
      iconMutedClass: "text-violet-400/55",
      iconHoverClass: "group-hover:text-emerald-300",
    },
    {
      icon: Palette,
      label: t.nav.art,
      href: `${hashBase}#gallery`,
      gradient:
        "radial-gradient(circle at 50% 50%, rgba(167,139,250,0.4) 0%, rgba(139,92,246,0.14) 42%, transparent 68%)",
      iconActiveClass: "text-violet-400",
      iconMutedClass: "text-violet-400/55",
      iconHoverClass: "group-hover:text-fuchsia-300",
    },
    {
      icon: Gamepad2,
      label: t.nav.lounge,
      href: "/gaming-kassel",
      gradient:
        "radial-gradient(circle at 50% 50%, rgba(244,114,182,0.35) 0%, rgba(219,39,119,0.12) 42%, transparent 68%)",
      iconActiveClass: "text-pink-400",
      iconMutedClass: "text-violet-400/55",
      iconHoverClass: "group-hover:text-pink-300",
    },
    {
      icon: Star,
      label: t.nav.reviews,
      href: `${hashBase}#reviews`,
      gradient:
        "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.35) 0%, rgba(245,158,11,0.12) 42%, transparent 68%)",
      iconActiveClass: "text-amber-400",
      iconMutedClass: "text-violet-400/55",
      iconHoverClass: "group-hover:text-amber-300",
    },
    {
      icon: MapPin,
      label: t.nav.visit,
      href: `${hashBase}#location`,
      gradient:
        "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.32) 0%, rgba(6,182,212,0.12) 42%, transparent 68%)",
      iconActiveClass: "text-cyan-400",
      iconMutedClass: "text-violet-400/55",
      iconHoverClass: "group-hover:text-cyan-300",
    },
  ];

  React.useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/55 backdrop-blur-md">
        <div className="relative mx-auto h-[4.25rem] max-w-6xl px-3 sm:h-[4.5rem] sm:px-6">
          <Link
            href="/"
            aria-label={t.nav.logoAlt}
            className="absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center sm:left-6"
            onClick={() => setMobileOpen(false)}
          >
            <GradientLogoMark
              maskAlign="left"
              className="h-8 w-[118px] sm:h-11 sm:w-[172px]"
              style={{
                filter:
                  "drop-shadow(0 0 10px rgba(139,92,246,0.45)) drop-shadow(0 0 20px rgba(16,185,129,0.2))",
              }}
            />
          </Link>

          <div className="absolute left-1/2 top-1/2 z-20 hidden w-auto max-w-none -translate-x-1/2 -translate-y-1/2 lg:block">
            <GlowMenuBar
              items={glowItems}
              activeHref={pathname === "/" ? activeHash : pathname}
              aria-label={t.nav.mainAria}
              className="mx-auto w-max"
            />
          </div>

          <div className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center gap-1.5 sm:right-6 sm:gap-3">
            <LanguageToggle />
            <a
              href="https://www.instagram.com/haze_and_chill_cafe/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-emerald-300 transition-colors hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-emerald-200"
              aria-label={t.nav.instagramLabel}
            >
              <Instagram className="h-5 w-5" strokeWidth={1.75} />
            </a>
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-violet-200 transition-colors hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-primary-nav"
              aria-label={mobileOpen ? t.nav.closeMobileNav : t.nav.openMobileNav}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <>
          <button
            type="button"
            aria-label={t.nav.closeMobileNav}
            className="fixed inset-x-0 bottom-0 top-[4.25rem] z-40 bg-black/70 backdrop-blur-sm sm:top-[4.5rem] lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            id="mobile-primary-nav"
            aria-label={t.nav.mobileNavTitle}
            className="fixed left-0 right-0 top-[4.25rem] z-50 max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain border-b border-white/10 bg-[#0b0b0f]/97 px-3 pb-8 pt-3 shadow-[0_28px_80px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:top-[4.5rem] sm:max-h-[calc(100dvh-4.5rem)] sm:px-4 lg:hidden"
          >
            <p className="mb-3 border-b border-white/10 pb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/80">
              {t.nav.mobileNavTitle}
            </p>
            <ul className="flex flex-col gap-2">
              {glowItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  activeHash !== undefined &&
                  activeHash !== "" &&
                  item.href === (pathname === "/" ? activeHash : pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex min-h-[3rem] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-violet-100 transition-colors active:bg-white/[0.08]",
                        isActive && "border-emerald-400/35 bg-emerald-500/10",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 shrink-0",
                          isActive ? item.iconActiveClass : item.iconMutedClass,
                        )}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      ) : null}
    </>
  );
}
