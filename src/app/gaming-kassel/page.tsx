import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Gamepad2, GlassWater, Moon, Users } from "lucide-react";
import { SiteNavbar } from "@/components/haze/site-navbar";
import { SiteFooter } from "@/components/haze/site-footer";
import { PageStructuredData } from "@/components/haze/structured-data";
import { Button } from "@/components/ui/button";
import { gamingDescription, gamingFaqItems } from "@/data/gaming";
import { siteLegal } from "@/config/site-legal";
import { buildPageMetadata, seoConfig } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Gaming Lounge & PlayStation", description: gamingDescription, path: "/gaming-kassel",
});
const features = [
  { icon: Gamepad2, title: "Zusammen zocken", body: "Eine Runde an der PlayStation, direkt mit deinen Leuten. Welche Spiele gerade laufen und wann ein Platz frei ist, klärst du mit unserem Team." },
  { icon: GlassWater, title: "Drinks in Reichweite", body: "Hausgemachter Eistee, Shakes oder Cocktails, auch alkoholfrei. Dazu Nachos oder ein Toast aus unserer Speisekarte." },
  { icon: Moon, title: "Den Abend genießen", body: "Nach der Runde bleibt ihr in der Lounge oder geht auf die Terrasse. Wir sind täglich von 17:00 bis 02:00 Uhr (bis Ende) für euch da." },
];

export default function GamingPage() {
  return <>
    <PageStructuredData name="Gaming Lounge & PlayStation in Kassel" path="/gaming-kassel" description={gamingDescription} />
    <SiteNavbar />
    <main lang="de" className="overflow-hidden bg-[#08060c]">
      <section className="relative border-b border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(109,40,217,0.25),transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <nav aria-label="Brotkrümelnavigation" className="mb-8 flex flex-wrap gap-2 text-sm text-violet-200/70">
            <Link href="/" className="inline-flex min-h-11 items-center hover:text-emerald-300">Haze &amp; Chill</Link>
            <span aria-hidden className="flex items-center">/</span>
            <span aria-current="page" className="flex items-center text-emerald-200">Gaming in Kassel</span>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">Play. Sip. Chill.</p>
              <h1 className="mt-5 font-display text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">Gaming Lounge<br /><span className="bg-gradient-to-r from-violet-300 to-emerald-200 bg-clip-text text-transparent">in Kassel.</span></h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-violet-100/85">Controller in die Hand. Den Alltag auf Pause. Spiel mit Freunden an der PlayStation und mach die nächste Runde zu eurem Abend bei Haze &amp; Chill.</p>
              <p className="mt-4 text-sm leading-relaxed text-violet-200/70">Café, Drinks und Gaming in der Kölnischen Straße – mitten in Kassel, mit Street Art, Neon und Platz zum Chillen.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild><Link href="/#reservation">Gaming-Abend anfragen <ArrowUpRight aria-hidden className="ml-2 h-4 w-4" /></Link></Button>
                <Button size="lg" variant="outline" asChild><Link href="/speisekarte">Drinks &amp; Snacks</Link></Button>
              </div>
              <p className="mt-4 max-w-lg text-xs leading-relaxed text-violet-200/70">Gaming-Wunsch im Nachrichtenfeld nennen. Konsole, Spiele und Konditionen nach Verfügbarkeit mit dem Team abstimmen.</p>
            </div>
            <figure className="relative rounded-3xl border border-violet-300/20 bg-white/[0.03] p-3 shadow-[0_0_70px_rgba(109,40,217,0.15)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image src="/gallery/pic3.webp" alt="Lounge mit Sofas, Fernseher und Neonlicht bei Haze & Chill in Kassel" fill sizes="(min-width: 1024px) 480px, 100vw" preload className="object-cover" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#08060c]/90 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur-md">
                  <Gamepad2 aria-hidden className="h-8 w-8 shrink-0 text-emerald-300" />
                  <p className="text-sm text-violet-50"><span className="block font-display font-bold text-white">Deine Crew. Euer Abend.</span>PlayStation · Drinks · Lounge</p>
                </div>
              </div>
              <figcaption className="px-2 pb-1 pt-3 text-xs text-violet-200/65">Ein Blick in unsere Lounge in Kassel.</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section aria-labelledby="gaming-evening" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex items-center gap-3 text-emerald-300"><Users aria-hidden className="h-5 w-5 shrink-0" /><p className="text-xs font-semibold uppercase tracking-[0.2em]">Offline zusammen. Online im Spiel.</p></div>
        <h2 id="gaming-evening" className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">Mehr als die nächste Runde.</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-violet-100/80">Du suchst eine Idee für einen Abend mit Freunden in Kassel? Bei uns gehören Konsole, Café und Lounge zusammen. Ihr könnt spielen, etwas trinken und euch zwischen den Runden in Ruhe unterhalten.</p>
        <div className="mt-9 grid gap-5 md:grid-cols-3">{features.map(({ icon: Icon, title, body }) => <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <Icon aria-hidden className="mb-5 h-6 w-6 text-violet-300" /><h3 className="font-display text-xl font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-relaxed text-violet-100/80">{body}</p>
        </article>)}</div>
        <Link href="/#lounge" className="mt-6 inline-flex min-h-11 items-center text-sm text-emerald-300 underline underline-offset-4">Lounge und Terrasse entdecken</Link>
      </section>
      <section aria-labelledby="gaming-faq" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 id="gaming-faq" className="font-display text-3xl font-bold text-white">Gut zu wissen, bevor ihr loslegt.</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">{gamingFaqItems.map(item => <article key={item.question}><h3 className="font-display text-lg font-semibold text-emerald-200">{item.question}</h3><p className="mt-3 text-sm leading-relaxed text-violet-100/80">{item.answer}</p></article>)}</div>
        </div>
      </section>
      <section aria-labelledby="gaming-visit" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col justify-between gap-8 rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-violet-900/20 to-emerald-900/10 p-7 sm:p-10 md:flex-row md:items-center">
          <div><h2 id="gaming-visit" className="font-display text-2xl font-bold text-white sm:text-3xl">Bereit für euren nächsten Abend?</h2><address className="mt-4 not-italic leading-relaxed text-violet-100/80">Haze &amp; Chill · {siteLegal.addressLine1}<br />{siteLegal.addressLine2}</address><p className="mt-2 text-sm text-emerald-200">Täglich 17:00–02:00 Uhr (bis Ende).</p></div>
          <div className="flex shrink-0 flex-col gap-3"><Button size="lg" asChild><Link href="/#reservation">Tisch &amp; Gaming anfragen</Link></Button><a href={seoConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center text-sm text-emerald-300 underline underline-offset-4">Anfahrt auf Google Maps<span className="sr-only"> (öffnet in einem neuen Tab)</span></a></div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
