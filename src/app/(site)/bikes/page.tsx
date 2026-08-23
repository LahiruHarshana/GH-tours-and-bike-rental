import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BikesPageClient } from "@/components/public/collections/BikesPageClient";
import { Reveal } from "@/components/public/motion/Reveal";
import { ServiceBar } from "@/components/public/navigation/ServiceBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBikes } from "@/lib/data";
import {
  absoluteUrl,
  breadcrumbSchema,
  businessId,
  createPageMetadata,
} from "@/lib/seo";
import Image from "next/image";

export const metadata: Metadata = createPageMetadata({
  title: "Bike & Scooter Rental Sri Lanka",
  description:
    "Rent a scooter or motorbike in Sri Lanka with helmet, clear handover and local support. Explore the coast, hill country and beyond at your own pace.",
  path: "/bikes",
  keywords: [
    "bike rental Sri Lanka",
    "scooter rental Sri Lanka",
    "motorbike rental Sri Lanka",
    "scooter hire south coast",
    "motorbike hire Sri Lanka",
  ],
});
export const dynamic = "force-dynamic";

export default async function BikesPage() {
  const bikes = await getBikes();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Bike Rental Sri Lanka", path: "/bikes" },
            ]),
            {
              "@type": "Service",
              "@id": absoluteUrl("/bikes#service"),
              name: "Bike and Scooter Rental in Sri Lanka",
              description:
                "Scooter and motorbike rental across Sri Lanka with helmets, handover and local support.",
              url: absoluteUrl("/bikes"),
              provider: { "@id": businessId },
              areaServed: { "@type": "Country", name: "Sri Lanka" },
              serviceType: "Motorbike and scooter rental",
            },
          ],
        }}
      />
      <section className="inner-hero inner-hero--bikes modern-section"><div className="container inner-hero__grid"><Reveal><div><span className="eyebrow eyebrow--light"><i />Bike rental Sri Lanka</span><h1>Two wheels.<br /><em>Your own rhythm.</em></h1><p>Reliable scooter and motorbike rental across Sri Lanka, with safety gear, a clear handover and local support for your ride.</p></div></Reveal><Reveal delay={100} className="inner-hero__art" direction="right"><figure data-scroll-motion><Image src="/images/bike-road.webp" alt="Motorbike rental for exploring Sri Lanka's coast and countryside"  width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw"/><figcaption><span>Sri Lanka</span><strong>Helmet · Handover · Support</strong></figcaption></figure></Reveal></div></section>
      <ServiceBar active="bikes" />
      <section className="section section--sand modern-section bikes-fleet-section" data-chapter="BIKE FLEET">
        <div className="container fleet-intro">
          <Reveal>
            <div>
              <span className="eyebrow"><i />Our fleet</span>
              <h2>Choose the bike that fits your road.</h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p>Select a model to see full details, then send a request. We confirm availability, licence requirements, deposit and final price before pickup.</p>
          </Reveal>
        </div>
        <div className="container">
          {bikes.length > 0 ? (
            <Suspense fallback={<p className="bikes-page-client__loading">Loading fleet…</p>}>
              <BikesPageClient bikes={bikes} />
            </Suspense>
          ) : (
            <div className="catalog-empty">
              <span aria-hidden="true">GH</span>
              <p>The fleet is being prepared.</p>
              <h2>Tell us when you want to ride.</h2>
              <Link className="button button--gold" href="/contact">Ask about a bike</Link>
            </div>
          )}
        </div>
      </section>
      <section className="section rental-guide modern-section"><div className="container"><div className="rental-guide__head"><span className="eyebrow"><i />Before the first kilometre</span><h2>Everything you need to ride responsibly.</h2><p>We keep the process clear, inspect each bike and explain local road conditions before handover.</p></div><div className="rental-guide__grid"><article><span>01</span><h3>Licence check</h3><p>Bring your passport, valid motorcycle licence and international permit where required.</p></article><article><span>02</span><h3>Safety handover</h3><p>Bike inspection, controls, helmets, fuel guidance and emergency contacts.</p></article><article><span>03</span><h3>Island support</h3><p>Message our local team if plans change or you need route advice during the rental.</p></article><article><span>04</span><h3>Easy return</h3><p>Return at the agreed location and complete a quick joint condition check.</p></article></div></div></section>
      <section className="section seo-guide modern-section" aria-labelledby="bike-local-title">
        <div className="container seo-guide__grid">
          <div><span className="eyebrow"><i />Ride across the island</span><h2 id="bike-local-title">Freedom on two wheels, wherever you roam.</h2></div>
          <div className="seo-guide__copy"><p>Whether you are exploring the south coast, hill country or beyond, tell us where you plan to travel and we will help you choose a suitable scooter or motorbike with a clear handover and local support.</p><p>Availability, rental period, deposit, licence requirements, pickup arrangements and final conditions are confirmed before handover.</p><Link className="button button--dark" href="/contact">Ask about availability</Link></div>
        </div>
      </section>
    </>
  );
}
