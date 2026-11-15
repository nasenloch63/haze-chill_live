import { MenuPageView } from "@/components/haze/menu-page-view";
import type { Metadata } from "next";
import { PageStructuredData } from "@/components/haze/structured-data";
import { menuData } from "@/data/menu-data";
import { businessId, buildPageMetadata, seoConfig } from "@/lib/seo";

const description = "Die Speisekarte von Haze and Chill in Kassel: Kaffee, Cocktails, Shakes, Snacks und Desserts mit allen Preisen. Auch als PDF verfügbar.";
export const metadata: Metadata = buildPageMetadata({ title: "Speisekarte & Preise", description, path: "/speisekarte" });
const menuUrl = `${seoConfig.baseUrl}/speisekarte`;
const categoryId = (index: number) => `kategorie-${index + 1}`;

const menuSchema = {
  "@type": "Menu", "@id": `${menuUrl}#menu`,
  name: "Speisekarte Haze and Chill", url: menuUrl, inLanguage: "de-DE",
  hasMenuSection: menuData.map((category, index) => ({
    "@type": "MenuSection", name: category.category,
    "@id": `${menuUrl}#${categoryId(index)}`,
    ...(category.notes ? { description: category.notes } : {}),
    hasMenuItem: category.items.map(item => ({
      "@type": "MenuItem", name: item.name,
      ...(item.description ? { description: item.description } : {}),
      offers: { "@type": "Offer", priceCurrency: "EUR",
        price: item.price.replace(" €", "").replace(",", "."),
        seller: { "@id": businessId } },
    })),
  })),
};

export default function MenuPage() {
  return <>
    <PageStructuredData name="Speisekarte & Preise" path="/speisekarte" description={description} entities={[menuSchema, {
      "@type": "WebPage", "@id": `${menuUrl}#page`, mainEntity: { "@id": `${menuUrl}#menu` },
    }]} />
    <MenuPageView />
  </>;
}
