import { siteLegal } from "@/config/site-legal";
import { faqItems } from "@/data/faq-items";
import { menuData } from "@/data/menu-data";
import { seoConfig } from "@/lib/seo";

const origin = seoConfig.baseUrl;
export function buildLlmsIndex() {
  return [
    "# Haze & Chill Café & Gaming Lounge Kassel", "",
    "> Café und Gaming Lounge in der Kasseler Innenstadt. PlayStation, Kaffee, hausgemachter Eistee, Cocktails, Snacks und Terrasse.", "",
    `Adresse: ${siteLegal.addressLine1}, ${siteLegal.addressLine2}, Deutschland.`,
    "Öffnungszeiten: täglich 17:00–02:00 Uhr (bis Ende).",
    "Gaming: PlayStation; aktuelle Spiele, Verfügbarkeit und Konditionen beim Team erfragen.",
    "Tischanfragen werden erst nach persönlicher Bestätigung verbindlich. Konsolennutzung gesondert abstimmen.",
    "Kein Verkauf von Cannabis, CBD- oder THC-Produkten.", "",
    "## Informationen", "",
    `- [Vollständige Textinformationen](${origin}/llms-full.txt): Unternehmensangaben, Gaming, FAQ und aktuelle Speisekarte aus den Website-Daten.`,
    `- [Café und Lounge](${origin}/): Überblick, Öffnungszeiten, Anfahrt und Tischanfrage.`,
    `- [Gaming Lounge in Kassel](${origin}/gaming-kassel): PlayStation und einen Abend mit Freunden planen.`,
    `- [Speisekarte mit Preisen](${origin}/speisekarte): Alle Speisen und Getränke in Euro.`,
    `- [Häufige Fragen](${origin}/faq): Antworten zu Besuch, Gaming und Angebot.`, "",
    "## Weitere Links", "",
    `- [Instagram](${seoConfig.instagramUrl}): Aktuelle Ankündigungen.`,
    `- [Anfahrt](${seoConfig.mapsUrl}): Offizieller Google-Maps-Link.`,
    `- [Impressum](${origin}/impressum)`,
    `- [Datenschutz](${origin}/datenschutz)`, "",
  ].join("\n");
}
export function buildLlmsFull() {
  return [
    buildLlmsIndex(), "",
    "## Fragen und Antworten", "",
    ...faqItems.flatMap(item => [`### ${item.question}`, item.answer, ""]),
    "## Speisekarte", "",
    "Alle Preise in Euro. Kennzeichnungen in eckigen Klammern stammen aus der Originalkarte. Die Legende zu Allergenen und Zusatzstoffen steht im PDF; bei Fragen hilft das Team vor Ort.",
    `Original-PDF: ${origin}/speisekarte.pdf`, "",
    ...menuData.flatMap(category => [
      `### ${category.category}`,
      ...(category.notes ? [category.notes] : []),
      ...category.items.map(item => `- ${item.name}: ${item.price}${item.description ? ` · ${item.description}` : ""}`), "",
    ]),
  ].join("\n");
}
