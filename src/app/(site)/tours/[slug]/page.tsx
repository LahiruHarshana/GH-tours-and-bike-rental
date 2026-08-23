import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TourBookingButton } from "@/components/booking/TourBookingButton";
import { Reveal } from "@/components/public/motion/Reveal";
import { ServiceBar } from "@/components/public/navigation/ServiceBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { getTourBySlug } from "@/lib/data";
import {
  absoluteUrl,
  breadcrumbSchema,
  businessId,
  createPageMetadata,
} from "@/lib/seo";
import { formatUSD } from "@/lib/utils";
import Image from "next/image";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  return tour
    ? createPageMetadata({
        title: `${tour.title} | Private Sri Lanka Tour`,
        description: tour.shortDescription,
        path: `/tours/${tour.slug}`,
        image: tour.image,
        keywords: [
          tour.title,
          "private Sri Lanka tour",
          `${tour.location} tour`,
          "Private Sri Lanka tour",
        ],
      })
    : createPageMetadata({
        title: "Tour not found",
        description: "This tour page is no longer available.",
        path: `/tours/${slug}`,
        noIndex: true,
      });
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Private Sri Lanka Tours", path: "/tours" },
              { name: tour.title, path: `/tours/${tour.slug}` },
            ]),
            {
              "@type": "TouristTrip",
              "@id": absoluteUrl(`/tours/${tour.slug}#trip`),
              name: tour.title,
              description: tour.description,
              image: tour.image,
              url: absoluteUrl(`/tours/${tour.slug}`),
              touristType: "Private leisure travellers",
              itinerary: {
                "@type": "ItemList",
                itemListElement: tour.itinerary.map((day) => ({
                  "@type": "ListItem",
                  position: day.day,
                  name: day.title,
                  description: day.description,
                })),
              },
              provider: { "@id": businessId },
              offers: {
                "@type": "Offer",
                price: tour.priceFrom,
                priceCurrency: "USD",
                url: absoluteUrl(`/tours/${tour.slug}`),
                availability: "https://schema.org/InStock",
              },
            },
          ],
        }}
      />
      <section className="tour-detail-hero modern-section">
        <div className="tour-detail-hero__image"><Image src={tour.image} alt={tour.title}  width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw"/></div>
        <div className="tour-detail-hero__overlay" />
        <div className="container tour-detail-hero__content">
          <Reveal>
            <Link href="/tours" className="back-link">← All journeys</Link>
            <p>{tour.location}</p>
            <h1>{tour.title}</h1>
            <div className="tour-detail-hero__facts"><span>{tour.durationDays} days</span><span>Private journey</span><span>Flexible start</span></div>
          </Reveal>
        </div>
      </section>

      <ServiceBar active="tours" />

      <section className="section tour-detail modern-section">
        <div className="container tour-detail__grid">
          <div className="tour-detail__main">
            <Reveal><p className="lead-copy">{tour.description}</p></Reveal>
            <Reveal delay={80}><div className="detail-block"><h2>Journey highlights</h2><div className="highlight-grid">{tour.highlights.map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div></div></Reveal>
            <Reveal delay={120}><div className="detail-block"><h2>Day by day</h2><div className="itinerary">{tour.itinerary.map((day) => <article key={day.day}><span>Day {String(day.day).padStart(2, "0")}</span><div><h3>{day.title}</h3><p>{day.description}</p></div></article>)}</div></div></Reveal>
            <Reveal delay={160}><div className="include-grid"><div><h3>Included</h3><ul>{tour.inclusions.map((item) => <li key={item}>✓ {item}</li>)}</ul></div><div><h3>Not included</h3><ul>{tour.exclusions.map((item) => <li key={item}>— {item}</li>)}</ul></div></div></Reveal>
          </div>
          <aside className="tour-booking-card">
            <span>Private journey from</span><strong>{formatUSD(tour.priceFrom)}</strong><small>Final price depends on group size, hotels and selected activities.</small>
            <TourBookingButton tour={tour} />
            <div className="booking-card-list"><span>✓ Free itinerary consultation</span><span>✓ No payment to request</span><span>✓ WhatsApp confirmation</span></div>
          </aside>
        </div>
      </section>
    </>
  );
}
