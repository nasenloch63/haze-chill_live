"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { translateMenuText } from "@/i18n/menu-copy";
import { menuData } from "@/data/menu-data";
import { menuCategoryVisuals } from "@/data/menu-category-visuals";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GradientMenuTabTrigger } from "@/components/ui/gradient-menu";
import { useLanguage } from "@/i18n/language-provider";

function MenuItemRow({
  name,
  description,
  price,
  priceAriaLabel,
}: {
  name: string;
  description: string;
  price: string;
  priceAriaLabel: string;
}) {
  return (
    <li>
      <div className="group flex flex-col gap-0.5 border-b border-white/5 py-3 transition-colors last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white group-hover:text-emerald-100/95">
            {name}
          </p>
          {description ? (
            <p className="mt-0.5 text-sm leading-snug text-violet-200/65">
              {description}
            </p>
          ) : null}
        </div>
        <p
          className="shrink-0 font-display text-base font-semibold tabular-nums text-emerald-300/95 sm:text-right"
          aria-label={priceAriaLabel}
        >
          {price}
        </p>
      </div>
    </li>
  );
}

export function MenuSection() {
  const { locale, t } = useLanguage();
  const defaultTab = "tab-0";
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <section
      id="menu"
      className="relative scroll-mt-20 border-t border-white/5 bg-[#0a0a0a] py-20 sm:py-28"
      aria-labelledby="menu-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(16,185,129,0.08),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h2
            id="menu-heading"
            className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{
              textShadow:
                "0 0 40px rgba(16,185,129,0.35), 0 0 80px rgba(139,92,246,0.2)",
            }}
          >
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-violet-300 bg-clip-text text-transparent">
              {t.menu.title}
            </span>
          </h2>
          <a
            href="/speisekarte.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-violet-100/90 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
          >
            <FileText className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            {t.menu.pdfCta}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only">{t.links.newTab}</span>
          </a>
          <div className="mt-3">
            <Link href="/speisekarte" className="inline-flex min-h-11 items-center text-sm text-emerald-300 underline underline-offset-4">
              {t.menu.fullMenuCta}
            </Link>
          </div>
        </header>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList
            role="tablist"
            aria-label={t.menu.categoriesAria}
            className="mb-8 flex w-full flex-nowrap justify-start gap-3 overflow-x-auto overflow-y-visible border-0 bg-transparent p-1 pb-3 pt-1 scrollbar-hide sm:flex-wrap sm:justify-center sm:gap-4 sm:overflow-visible sm:pb-2"
          >
            {menuData.map((cat, i) => {
              const visual = menuCategoryVisuals[cat.category];
              if (!visual) return null;
              const { Icon, gradientFrom, gradientTo } = visual;
              return (
                <TabsTrigger
                  key={cat.category}
                  value={`tab-${i}`}
                  asChild
                  className="rounded-full border-0 bg-transparent p-0 shadow-none ring-offset-0 focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <GradientMenuTabTrigger
                    label={translateMenuText(cat.category, locale)}
                    gradientFrom={gradientFrom}
                    gradientTo={gradientTo}
                    Icon={Icon}
                    title={translateMenuText(cat.category, locale)}
                  />
                </TabsTrigger>
              );
            })}
          </TabsList>

          {menuData.map((cat, i) => (
            <TabsContent key={cat.category} value={`tab-${i}`}>
              <h3 className="font-display text-lg font-semibold text-violet-100">
                {translateMenuText(cat.category, locale)}
              </h3>
              {cat.notes ? (
                <p className="mt-2 rounded-lg border border-emerald-500/20 bg-emerald-950/20 px-3 py-2 text-sm text-emerald-200/80">
                  {translateMenuText(cat.notes, locale)}
                </p>
              ) : null}
              <ul className="mt-4 list-none p-0" role="list">
                {cat.items.map((item) => (
                  <MenuItemRow
                    key={`${cat.category}-${item.name}`}
                    name={translateMenuText(item.name, locale)}
                    description={translateMenuText(item.description, locale)}
                    price={item.price}
                    priceAriaLabel={t.menu.priceAria(item.price)}
                  />
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>

        <p className="mt-10 text-center text-xs leading-relaxed text-violet-400/70 sm:text-sm">
          {t.menu.footerNote}
        </p>
      </div>
    </section>
  );
}
