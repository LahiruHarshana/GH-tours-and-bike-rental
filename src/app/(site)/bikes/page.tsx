import type { Metadata } from "next";
import Link from "next/link";
import { BikeCard } from "@/components/public/cards/BikeCard";
import { Reveal } from "@/components/public/motion/Reveal";
import { AnimatedCatalogGrid } from "@/components/public/collections/AnimatedCatalogGrid";
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
  title: "Bike & Scooter Rental Weligama, Sri Lanka",
  description:
    "Rent a scooter or motorbike in Weligama with helmet, clear handover and local support. Explore Mirissa, Midigama, Ahangama and Sri Lanka's south coast.",
  path: "/bikes",
  keywords: [
    "bike rental Weligama",
    "scooter rental Weligama",
    "motorbike rental Weligama",
    "bike hire Matara",
    "scooter rental Sri Lanka south coast",
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
              { name: "Bike Rental Weligama", path: "/bikes" },
            ]),
            {
              "@type": "Service",
              "@id": absoluteUrl("/bikes#service"),
              name: "Bike and Scooter Rental in Weligama",
              description:
                "Scooter and motorbike rental in Weligama with helmets, handover and local support.",
              url: absoluteUrl("/bikes"),
              provider: { "@id": businessId },
              areaServed: [
                { "@type": "City", name: "Weligama" },
                { "@type": "City", name: "Mirissa" },
                { "@type": "AdministrativeArea", name: "Matara District" },
              ],
              serviceType: "Motorbike and scooter rental",
            },
          ],
        }}
      />
      <section className="inner-hero inner-hero--bikes modern-section"><div className="container inner-hero__grid"><Reveal><div><span className="eyebrow eyebrow--light"><i />Bike rental Weligama</span><h1>Two wheels.<br /><em>One southern coast.</em></h1><p>Reliable scooter and motorbike rental in Weligama, with safety gear, a clear handover and local support for your ride.</p></div></Reveal><Reveal delay={100} className="inner-hero__art" direction="right"><figure data-scroll-motion><Image src="/images/bike-road.webp" alt="Motorbike rental for exploring Weligama and Sri Lanka's south coast"  width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw"/><figcaption><span>Weligama · Matara</span><strong>Helmet · Handover · Support</strong></figcaption></figure></Reveal></div></section>
      <ServiceBar active="bikes" />
      <section className="section section--sand modern-section"><div className="container fleet-intro"><div><span className="eyebrow"><i />Our fleet</span><h2>Choose the bike that fits your road.</h2></div><p>Request the model you want — we confirm availability, licence requirements, deposit and final price before pickup. No public pricing; every rental is quoted personally.</p></div><div className="container">{bikes.length > 0 ? <AnimatedCatalogGrid variant="bikes">{bikes.map((bike, index) => <BikeCard key={bike.id} bike={bike} index={index} />)}</AnimatedCatalogGrid> : <div className="catalog-empty"><span aria-hidden="true">GH</span><p>The fleet is being prepared.</p><h2>Tell us when you want to ride.</h2><Link className="button button--gold" href="/contact">Ask about a bike</Link></div>}</div></section>
      <section className="section rental-guide modern-section"><div className="container"><div className="rental-guide__head"><span className="eyebrow"><i />Before the first kilometre</span><h2>Everything you need to ride responsibly.</h2><p>We keep the process clear, inspect each bike and explain local road conditions before handover.</p></div><div className="rental-guide__grid"><article><span>01</span><h3>Licence check</h3><p>Bring your passport, valid motorcycle licence and international permit where required.</p></article><article><span>02</span><h3>Safety handover</h3><p>Bike inspection, controls, helmets, fuel guidance and emergency contacts.</p></article><article><span>03</span><h3>Island support</h3><p>Message our local team if plans change or you need route advice during the rental.</p></article><article><span>04</span><h3>Easy return</h3><p>Return at the agreed location and complete a quick joint condition check.</p></article></div></div></section>
      <section className="section seo-guide modern-section" aria-labelledby="bike-local-title">
        <div className="container seo-guide__grid">
          <div><span className="eyebrow"><i />Explore from Weligama</span><h2 id="bike-local-title">A practical base for south-coast rides.</h2></div>
          <div className="seo-guide__copy"><p>From Weligama, shorter rides can connect Mirissa, Midigama, Ahangama, Matara and the beaches between them. Tell us where you plan to travel and we will help you choose a suitable scooter or motorbike.</p><p>Availability, rental period, deposit, licence requirements, pickup arrangements and final conditions are confirmed before handover.</p><Link className="button button--dark" href="/weligama">Explore Weligama services</Link></div>
        </div>
      </section>
    </>
  );
}
