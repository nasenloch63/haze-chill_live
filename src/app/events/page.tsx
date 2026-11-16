import { EventsView } from "@/components/haze/events-view";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Events in Kassel",
  description: "Monatliche Events mit der Living Soil Crew und offene Treffen der DHV-Ortsgruppe Kassel im Haze & Chill Café.",
  path: "/events",
});

export default function EventsPage() {
  return <EventsView />;
}
