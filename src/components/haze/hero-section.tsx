"use client";

import Link from "next/link";
import { WarpShaderHero } from "@/components/ui/warp-shader";
import { Button } from "@/components/ui/button";
import { GradientLogoMark } from "@/components/haze/gradient-logo-mark";
import { useLanguage } from "@/i18n/language-provider";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <WarpShaderHero>
      <div className="relative flex flex-1 flex-col">
        {/* Monumental logo — lives in the plane of the shader, behind copy */}
        <div
          className="pointer-events-none absolute inset-0 z-[5] overflow-hidden select-none"
          aria-hidden
        >
          <div className="absolute left-1/2 top-[36%] h-[min(132vmin,104rem)] w-[min(132vmin,104rem)] -translate-x-1/2 -translate-y-1/2 sm:top-[38%] md:top-[40%]">
            <GradientLogoMark
              maskAlign="center"
              className="h-full w-full opacity-[0.68] mix-blend-soft-light sm:opacity-[0.78] md:opacity-[0.88]"
              style={{
                filter:
                  "drop-shadow(0 0 80px rgba(139,92,246,0.65)) drop-shadow(0 0 160px rgba(16,185,129,0.28)) drop-shadow(0 0 32px rgba(255,255,255,0.12))",
              }}
            />
          </div>
          {/* Wider echo for atmosphere (same mark, softer) */}
          <div className="absolute left-1/2 top-[36%] h-[min(155vmin,118rem)] w-[min(155vmin,118rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.38] mix-blend-screen blur-[2px] sm:top-[38%] md:top-[40%] md:opacity-[0.45]">
            <GradientLogoMark
              maskAlign="center"
              className="h-full w-full"
              style={{
                filter:
                  "blur(1px) drop-shadow(0 0 140px rgba(139,92,246,0.35))",
              }}
            />
          </div>
        </div>

        {/* Pull focus to the type block without killing the mural */}
        <div
          className="pointer-events-none absolute inset-0 z-[8] bg-[radial-gradient(ellipse_72%_62%_at_50%_34%,rgba(6,4,14,0.14)_0%,rgba(6,4,14,0.38)_52%,rgba(4,3,10,0.66)_100%)]"
          aria-hidden
        />

        <div className="relative z-20 flex flex-1 flex-col justify-center px-4 pb-40 pt-[4.5rem] sm:px-6 sm:pb-48 sm:pt-20 md:pb-52 md:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300 drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)] sm:mb-5 sm:text-sm">
              {t.hero.locationLine}
            </p>
            <h1 className="font-display text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="block drop-shadow-[0_4px_32px_rgba(0,0,0,0.95)]">
                Haze &amp; Chill
              </span>
              <span className="mt-2 block bg-gradient-to-r from-violet-300 via-fuchsia-200 to-emerald-300 bg-clip-text text-2xl text-transparent sm:text-3xl md:text-4xl">
                {t.hero.heading}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-sans text-base text-violet-50/95 drop-shadow-[0_2px_18px_rgba(0,0,0,0.92)] sm:mt-7 sm:text-lg">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-5">
              <Button variant="default" size="lg" asChild>
                <Link href="/#reservation">{t.hero.reservationCta}</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <Link href="/gaming-kassel">{t.hero.vibeCta}</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <Link href="/#menu">{t.hero.menuCta}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </WarpShaderHero>
  );
}
