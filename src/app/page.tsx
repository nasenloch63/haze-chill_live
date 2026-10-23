import { PageStructuredData } from "@/components/haze/structured-data";
import type { Metadata } from "next";
import { SiteNavbar } from "@/components/haze/site-navbar";
import { HeroSection } from "@/components/haze/hero-section";
import { MenuSection } from "@/components/MenuSection";
import { ReservationSection } from "@/components/haze/reservation-section";
import { LocalSeoSections } from "@/components/haze/local-seo-sections";
import { ArtOfChillGallery } from "@/components/haze/art-gallery";
import { LoungeExperience } from "@/components/haze/lounge-experience";
import { GoogleReviewsWall } from "@/components/haze/google-reviews-wall";
import { LocationHours } from "@/components/haze/location-hours";
import { SiteFooter } from "@/components/haze/site-footer";
import { buildPageMetadata, seoConfig } from "@/lib/seo";



export const metadata: Metadata = buildPageMetadata({
  title: "Café & Gaming Lounge in Kassel",
  description: seoConfig.defaultDescription,
  path: "/",
});

export default function Home() {
  return (
    <>
      <PageStructuredData name={seoConfig.defaultTitle} path="/" description={seoConfig.defaultDescription} />
      <SiteNavbar />
      <main>
        <HeroSection />
        <LocalSeoSections />
        <LoungeExperience />
        <ReservationSection />
        <MenuSection />
        <ArtOfChillGallery />
        <GoogleReviewsWall />
        <LocationHours />
      </main>
      <SiteFooter />
    </>
  );
}
