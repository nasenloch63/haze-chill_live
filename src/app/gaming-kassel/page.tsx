import { GamingPageView } from "@/components/haze/gaming-page-view";
import { PageStructuredData } from "@/components/haze/structured-data";
import { gamingDescription } from "@/data/gaming";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Gaming Lounge & PlayStation", description: gamingDescription, path: "/gaming-kassel",
});

export default function GamingPage() {
  return <>
    <PageStructuredData name="Gaming Lounge & PlayStation in Kassel" path="/gaming-kassel" description={gamingDescription} />
    <GamingPageView />
  </>;
}
