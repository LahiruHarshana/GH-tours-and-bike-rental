import type { Metadata } from "next";
import { TourCard } from "@/components/public/cards/TourCard";
import { Reveal } from "@/components/public/motion/Reveal";
import { AnimatedCatalogGrid } from "@/components/public/collections/AnimatedCatalogGrid";
import { getTours } from "@/lib/data";
import Image from "next/image";

export const metadata: Metadata = { title: "Private Sri Lanka Tours", description: "Explore flexible private Sri Lanka tour packages and custom itineraries." };
export const dynamic = "force-dynamic";

export default async function ToursPage() {
  const tours = await getTours();
  return (
    <>
      <section className="inner-hero inner-hero--tours modern-section">
        <div className="container inner-hero__grid">
          <Reveal><div><span className="eyebrow eyebrow--light"><i />Private journeys</span><h1>See the island.<br /><em>Feel its story.</em></h1><p>Flexible routes that connect Sri Lanka&apos;s ancient culture, wild landscapes, tea country and coast.</p></div></Reveal>
          <Reveal delay={100} className="inner-hero__art" direction="right"><figure data-scroll-motion><Image src="/images/sigiriya.webp" alt="Sigiriya rock fortress surrounded by Sri Lanka's forest"  width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw"/><figcaption><span>Cultural Triangle</span><strong>Ancient stone · Early light</strong></figcaption></figure></Reveal>
        </div>
      </section>
      <section className="section section--sand modern-section">
        <div className="container filter-intro">
          <p><strong>{tours.length} journeys</strong> ready to customise</p>
          <span>All prices are starting estimates in USD for private arrangements.</span>
        </div>
        <div className="container">
          <AnimatedCatalogGrid variant="tours">
            {tours.map((tour, index) => <TourCard key={tour.id} tour={tour} index={index} />)}
          </AnimatedCatalogGrid>
        </div>
      </section>
      <section className="custom-route-band modern-section"><div className="container"><div><span>Nothing here fits perfectly?</span><h2>Good. Let us build it around you.</h2></div><a className="button button--gold" href="/contact">Create a custom route</a></div></section>
    </>
  );
}
