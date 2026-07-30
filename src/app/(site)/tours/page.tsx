import type { Metadata } from "next";
import Link from "next/link";
import { TourCard } from "@/components/public/cards/TourCard";
import { Reveal } from "@/components/public/motion/Reveal";
import { AnimatedCatalogGrid } from "@/components/public/collections/AnimatedCatalogGrid";
import { ServiceBar } from "@/components/public/navigation/ServiceBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { getTours } from "@/lib/data";
import {
  absoluteUrl,
  breadcrumbSchema,
  businessId,
  createPageMetadata,
} from "@/lib/seo";
import Image from "next/image";

export const metadata: Metadata = createPageMetadata({
  title: "Private Sri Lanka Tours from Weligama",
  description:
    "Explore flexible private Sri Lanka tours from Weligama with a local Matara-based team. Custom routes for culture, wildlife, tea country and the south coast.",
  path: "/tours",
  keywords: [
    "private Sri Lanka tours",
    "Weligama tours",
    "Sri Lanka tour packages",
    "private driver Sri Lanka",
    "Matara tour operator",
  ],
});
export const dynamic = "force-dynamic";

export default async function ToursPage() {
  const tours = await getTours();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Private Sri Lanka Tours", path: "/tours" },
            ]),
            {
              "@type": "Service",
              "@id": absoluteUrl("/tours#service"),
              name: "Private Sri Lanka Tours",
              description:
                "Flexible private tours and custom itineraries across Sri Lanka, planned from Weligama.",
              url: absoluteUrl("/tours"),
              provider: { "@id": businessId },
              areaServed: { "@type": "Country", name: "Sri Lanka" },
              serviceType: "Private tour planning and driver-guided travel",
            },
            {
              "@type": "ItemList",
              name: "Private Sri Lanka tour packages",
              itemListElement: tours.map((tour, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: absoluteUrl(`/tours/${tour.slug}`),
                name: tour.title,
              })),
            },
          ],
        }}
      />
      <section className="inner-hero inner-hero--tours modern-section">
        <div className="container inner-hero__grid">
          <Reveal><div><span className="eyebrow eyebrow--light"><i />Private tours from Weligama</span><h1>See the island.<br /><em>Feel its story.</em></h1><p>Flexible Sri Lanka tours from our Weligama base, connecting ancient culture, wild landscapes, tea country and the coast.</p></div></Reveal>
          <Reveal delay={100} className="inner-hero__art" direction="right"><figure data-scroll-motion><Image src="/images/sigiriya.webp" alt="Sigiriya rock fortress surrounded by Sri Lanka's forest"  width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw"/><figcaption><span>Cultural Triangle</span><strong>Ancient stone · Early light</strong></figcaption></figure></Reveal>
        </div>
      </section>
      <ServiceBar active="tours" />
      <section className="section section--sand modern-section">
        <div className="container filter-intro">
          <p><strong>{tours.length} journeys</strong> ready to customise</p>
          <span>All prices are starting estimates in USD for private arrangements.</span>
        </div>
        <div className="container">
          {tours.length > 0 ? (
            <AnimatedCatalogGrid variant="tours">
              {tours.map((tour, index) => <TourCard key={tour.id} tour={tour} index={index} />)}
            </AnimatedCatalogGrid>
          ) : (
            <div className="catalog-empty">
              <span aria-hidden="true">GH</span>
              <p>New journeys are being prepared.</p>
              <h2>Let us shape one around you.</h2>
              <Link className="button button--gold" href="/contact">Plan a custom journey</Link>
            </div>
          )}
        </div>
      </section>
      <section className="custom-route-band modern-section"><div className="container"><div><span>Nothing here fits perfectly?</span><h2>Good. Let us build it around you.</h2></div><a className="button button--gold" href="/contact">Create a custom route</a></div></section>
    </>
  );
}
