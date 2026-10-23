import Link from "next/link";
import { siteLegal } from "@/config/site-legal";
import { seoConfig } from "@/lib/seo";

export function LocalSeoSections() {
  return <section id="about" lang="de" className="border-t border-white/5 bg-[#090909] py-20 sm:py-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Dein Abend bei Haze and Chill</h2>
        <p className="mt-4 leading-relaxed text-violet-100/80">Nach Feierabend noch eine Runde zocken oder mit Freunden einen Drink genießen? Haze &amp; Chill verbindet Café und Gaming Lounge in der Kasseler Innenstadt: PlayStation, hausgemachter Eistee, Cocktails und Snacks, umgeben von Street Art und Neon.</p>
      </header>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="font-display text-xl font-semibold text-emerald-200">Getränke und Speisen</h3>
          <p className="mt-3 text-violet-100/80">Espresso, Cappuccino oder ein Cocktail zum Abend: Die Karte umfasst auch alkoholfreie Cocktails, Fruchtbecher, Toasts, Nachos und Ramen.</p>
          <Link href="/speisekarte" className="mt-4 inline-flex min-h-11 items-center text-sm text-emerald-300 underline underline-offset-4">Vollständige Speisekarte mit Preisen</Link>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="font-display text-xl font-semibold text-emerald-200">Gaming in Kassel – mit deiner Crew</h3>
          <p className="mt-3 text-violet-100/80">Gemeinsam an der PlayStation spielen, zwischendurch einen Shake trinken und danach auf der Terrasse weiterquatschen. Frag für euren Gaming-Abend einen Tisch an und stimmt die Konsolennutzung mit dem Team ab.</p>
          <Link href="/gaming-kassel" className="mt-4 inline-flex min-h-11 items-center text-sm text-emerald-300 underline underline-offset-4">Gaming Lounge entdecken</Link>
        </article>
      </div>
      <article id="contact" className="mt-8 scroll-mt-24 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6">
        <h3 className="font-display text-xl font-semibold text-white">Adresse und Öffnungszeiten</h3>
        <address className="mt-3 not-italic text-violet-50/90">{siteLegal.tradeName}<br />{siteLegal.addressLine1}<br />{siteLegal.addressLine2}</address>
        <p className="mt-3 font-medium text-emerald-200">Täglich 17:00–02:00 Uhr (bis Ende).</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <a href={seoConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-emerald-300 underline underline-offset-4">Anfahrt auf Google Maps<span className="sr-only"> (öffnet in einem neuen Tab)</span></a>
          <Link href="/faq" className="inline-flex min-h-11 items-center text-emerald-300 underline underline-offset-4">Fragen zum Besuch</Link>
        </div>
      </article>
    </div>
  </section>;
}
