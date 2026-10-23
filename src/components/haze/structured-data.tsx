import { businessId, seoConfig, websiteId } from "@/lib/seo";

/** Include structured data in the initial HTML, without requiring JavaScript. */
export function StructuredData({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  }} />;
}

export function PageStructuredData({ name, path, description, entities = [] }: {
  name: string; path: string; description: string; entities?: object[];
}) {
  const url = new URL(path, seoConfig.baseUrl).toString();
  return <StructuredData data={{
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "WebPage", "@id": `${url}#page`,
      url, name, description, inLanguage: "de-DE",
      isPartOf: { "@id": websiteId }, about: { "@id": businessId },
      ...(path !== "/" ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    }, ...(path !== "/" ? [{
      "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: seoConfig.siteName, item: `${seoConfig.baseUrl}/` },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    }] : []), ...entities],
  }} />;
}
