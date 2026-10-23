"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gamepad2, Sun } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function FeatureCard({
  icon: Icon,
  title,
  body,
  accent,
}: {
  icon: typeof Gamepad2;
  title: string;
  body: string;
  accent: "emerald" | "violet";
}) {
  const ring =
    accent === "emerald"
      ? "group-hover:shadow-[0_0_36px_rgba(16,185,129,0.2)] group-hover:border-emerald-400/35"
      : "group-hover:shadow-[0_0_36px_rgba(139,92,246,0.22)] group-hover:border-violet-400/35";

  const iconBg =
    accent === "emerald"
      ? "from-emerald-500/25 to-teal-600/10 text-emerald-300"
      : "from-violet-500/30 to-fuchsia-600/10 text-violet-200";

  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-all duration-500 sm:p-8",
        ring,
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
        style={{
          background:
            accent === "emerald"
              ? "radial-gradient(circle, rgba(16,185,129,0.4), transparent 70%)"
              : "radial-gradient(circle, rgba(139,92,246,0.45), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className={cn(
          "mb-4 inline-flex rounded-2xl bg-gradient-to-br p-3.5 ring-1 ring-white/10",
          iconBg,
        )}
      >
        <Icon className="h-7 w-7" strokeWidth={1.6} />
      </div>
      <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-violet-200/75 sm:text-base">
        {body}
      </p>
    </motion.article>
  );
}

export function LoungeExperience() {
  const { t, locale } = useLanguage();

  return (
    <section
      id="lounge"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/5 py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(109,40,217,0.18),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-emerald-400/90"
          >
            Haze &amp; Chill
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-3xl font-black tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            <span className="bg-gradient-to-r from-white via-violet-100 to-emerald-200/90 bg-clip-text text-transparent">
              {t.lounge.title}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-violet-200/70 sm:text-lg"
          >
            {t.lounge.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
          className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-2 sm:gap-6"
        >
          <FeatureCard
            icon={Gamepad2}
            title={t.lounge.gaming.title}
            body={t.lounge.gaming.body}
            accent="violet"
          />
          <FeatureCard
            icon={Sun}
            title={t.lounge.terrace.title}
            body={t.lounge.terrace.body}
            accent="emerald"
          />
        </motion.div>
        <div className="mt-8 text-center"><Link href="/gaming-kassel" className="inline-flex min-h-11 items-center rounded-full border border-violet-400/30 bg-violet-500/10 px-6 text-sm font-medium text-violet-100 transition-colors hover:border-emerald-400/40 hover:text-emerald-200">{locale === "de" ? "Mehr zu Gaming & PlayStation" : "Explore gaming & PlayStation"} <span aria-hidden className="ml-2">↗</span></Link></div>
      </div>
    </section>
  );
}
