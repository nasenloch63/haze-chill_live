import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { LanguageProvider } from "@/i18n/language-provider";
import { siteLegal } from "@/config/site-legal";
import { businessId, seoConfig, websiteId } from "@/lib/seo";
import { StructuredData } from "@/components/haze/structured-data";
import "./globals.css";

const display = Syne({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.baseUrl),
  title: { default: seoConfig.defaultTitle, template: seoConfig.titleTemplate },
  description: seoConfig.defaultDescription,
  icons: { icon: "/gallery/favicon.svg" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [{
    "@type": "CafeOrCoffeeShop", "@id": businessId,
    name: siteLegal.tradeName, alternateName: "Haze & Chill",
    description: seoConfig.defaultDescription, url: `${seoConfig.baseUrl}/`,
    logo: `${seoConfig.baseUrl}/gallery/haze-chill-logo.png`,
    image: [`${seoConfig.baseUrl}/gallery/pic1.webp`, `${seoConfig.baseUrl}/gallery/pic2.webp`],
    email: siteLegal.email,
    ...(siteLegal.phone ? { telephone: siteLegal.phone } : {}),
    address: { "@type": "PostalAddress", streetAddress: siteLegal.addressLine1,
      postalCode: "34117", addressLocality: "Kassel", addressCountry: "DE" },
    hasMap: seoConfig.mapsUrl, hasMenu: `${seoConfig.baseUrl}/speisekarte`,
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "17:00", closes: "02:00",
    }],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "PlayStation", value: true },
      { "@type": "LocationFeatureSpecification", name: "Terrasse", value: true },
    ],
    acceptsReservations: `${seoConfig.baseUrl}/#reservation`,
    servesCuisine: ["Kaffee", "Snacks", "Desserts"], currenciesAccepted: "EUR",
    sameAs: [seoConfig.instagramUrl],
  }, {
    "@type": "WebSite", "@id": websiteId,
    name: seoConfig.siteName, url: `${seoConfig.baseUrl}/`, inLanguage: "de-DE",
    publisher: { "@id": businessId },
  }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de" className="dark" suppressHydrationWarning>
    <head><link rel="describedby" href="/llms.txt" type="text/plain" /></head>
    <body className={`${display.variable} ${sans.variable} min-h-screen font-sans`}>
      <StructuredData data={siteGraph} />
      <LanguageProvider>{children}</LanguageProvider>
    </body>
  </html>;
}
