import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TourCard } from "@/components/public/cards/TourCard";
import { ToursDestinationMarquee } from "@/components/public/collections/ToursDestinationMarquee";
import { ToursDestinationShowcase } from "@/components/public/collections/ToursDestinationShowcase";
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

export const metadata: Metadata = createPageMetadata({
  title: "Private Sri Lanka Tours & Custom Journeys",
  description:
    "Design a custom private Sri Lanka journey — pick your destinations, pace and dates. Culture, wildlife, tea country, coast and beyond.",
  path: "/tours",
  keywords: [
    "private Sri Lanka tours",
    "custom Sri Lanka itinerary",
    "Sri Lanka tour operator",
    "private driver Sri Lanka",
    "tailor-made Sri Lanka tours",
  ],
});
export const dynamic = "force-dynamic";

const steps = [
  {
    no: "01",
    title: "Pick your places",
    copy: "Ella, Kandy, the south coast, Yala, Sinharaja, Arugam Bay — or tell us your own list.",
    featured: true,
  },
  {
    no: "02",
    title: "Set your pace",
    copy: "Slow surf days, early safaris, train windows or temple mornings — we shape the rhythm around you.",
    featured: false,
  },
  {
    no: "03",
    title: "We handle the rest",
    copy: "Driver, route, timing and local support across Sri Lanka. You travel — we connect the dots.",
    featured: false,
  },
] as const;

export default async function ToursPage() {
  const tours = await getTours();

  const schemaGraph: Record<string, unknown>[] = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Private Sri Lanka Tours", path: "/tours" },
    ]),
    {
      "@type": "Service",
      "@id": absoluteUrl("/tours#service"),
      name: "Private Sri Lanka Tours",
      description:
        "Custom private tours and tailor-made itineraries across Sri Lanka.",
      url: absoluteUrl("/tours"),
      provider: { "@id": businessId },
      areaServed: { "@type": "Country", name: "Sri Lanka" },
      serviceType: "Custom private tour planning and driver-guided travel",
    },
  ];

  if (tours.length > 0) {
    schemaGraph.push({
      "@type": "ItemList",
      name: "Private Sri Lanka tour packages",
      itemListElement: tours.map((tour, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/tours/${tour.slug}`),
        name: tour.title,
      })),
    });
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": schemaGraph,
        }}
      />

      <section className="tours-page-hero modern-section" data-scroll-motion data-range="enter">
        <div className="tours-page-hero__backdrop" aria-hidden="true">
          <Image
            src="/images/journeys/ella.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="tours-page-hero__image"
          />
        </div>
        <div className="container tours-page-hero__shell">
          <div className="tours-page-hero__copy">
            <span className="tours-page-hero__eyebrow">Custom journeys · Sri Lanka</span>
            <h1>
              Your island.
              <br />
              <em>Your route.</em>
            </h1>
            <p className="tours-page-hero__lead">
              A local team that connects Sri Lanka&apos;s best places into a private journey — built
              around your dates, pace and interests. No cookie-cutter packages.
            </p>
            <ul className="tours-page-hero__tags" aria-label="Journey highlights">
              <li>Private driver</li>
              <li>Flexible pacing</li>
              <li>Island-wide coverage</li>
            </ul>
            <div className="tours-page-hero__actions">
              <Link href="/custom-tour" className="tours-page-hero__cta">
                Design my custom journey
                <span aria-hidden="true">↗</span>
              </Link>
              <Link href="#destinations" className="tours-page-hero__secondary">
                Explore destinations ↓
              </Link>
            </div>
          </div>
          <aside className="tours-page-hero__stats" aria-label="Journey facts">
            <div className="tours-page-hero__stat">
              <strong>07</strong>
              <span>Signature destinations</span>
            </div>
            <div className="tours-page-hero__stat">
              <strong>100%</strong>
              <span>Custom routes</span>
            </div>
            <div className="tours-page-hero__stat">
              <strong>Island-wide</strong>
              <span>Across Sri Lanka</span>
            </div>
          </aside>
        </div>
      </section>

      <ToursDestinationMarquee />

      <ServiceBar active="tours" />

      <section className="tours-page-steps modern-section" data-scroll-motion>
        <div className="tours-page-steps__shell">
          <div className="tours-page-steps__head">
            <p className="tours-page-steps__eyebrow">How it works</p>
            <h2>We plan with you — not for a brochure.</h2>
            <p>
              Tell us where you want to go and how you like to travel. We reply with a clear route,
              timing and quote.
            </p>
          </div>
          <div className="tours-page-steps__grid">
            {steps.map((step) => (
              <article
                key={step.no}
                className={
                  step.featured
                    ? "tours-page-steps__card tours-page-steps__card--featured"
                    : "tours-page-steps__card"
                }
                data-cinema="rise"
              >
                <span className="tours-page-steps__no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div id="destinations">
        <ToursDestinationShowcase />
      </div>

      {tours.length > 0 && (
        <section className="tours-page-packages modern-section" data-scroll-motion>
          <div className="tours-page-packages__head container">
            <div>
              <p className="tours-page-packages__eyebrow">Optional templates</p>
              <h2>Ready-made starting points</h2>
              <p>
                {tours.length} published {tours.length === 1 ? "journey" : "journeys"} — all
                adjustable to your dates and pace.
              </p>
            </div>
          </div>
          <div className="container">
            <AnimatedCatalogGrid variant="tours">
              {tours.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} index={index} />
              ))}
            </AnimatedCatalogGrid>
          </div>
        </section>
      )}

      <section className="tours-page-finale modern-section" data-scroll-motion>
        <div className="tours-page-finale__backdrop" aria-hidden="true">
          <Image
            src="/images/journeys/kandy.webp"
            alt=""
            fill
            sizes="100vw"
            className="tours-page-finale__image"
          />
        </div>
        <div className="container tours-page-finale__shell">
          <span className="tours-page-finale__eyebrow">Start here</span>
          <h2>Ready when you are — we&apos;ll shape the route.</h2>
          <p>
            Share your dates, destinations and travel style. Our team replies with a clear
            plan and quote.
          </p>
          <Link href="/custom-tour" className="tours-page-finale__cta">
            Design your custom journey
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
