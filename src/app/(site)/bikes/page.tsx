import type { Metadata } from "next";
import { BikeCard } from "@/components/public/cards/BikeCard";
import { Reveal } from "@/components/public/motion/Reveal";
import { AnimatedCatalogGrid } from "@/components/public/collections/AnimatedCatalogGrid";
import { getBikes } from "@/lib/data";
import Image from "next/image";

export const metadata: Metadata = { title: "Motorbike Rental Sri Lanka", description: "Rent reliable scooters and motorbikes with helmets and local support." };
export const dynamic = "force-dynamic";

export default async function BikesPage() {
  const bikes = await getBikes();
  return (
    <>
      <section className="inner-hero inner-hero--bikes modern-section"><div className="container inner-hero__grid"><Reveal><div><span className="eyebrow eyebrow--light"><i />Ride your own rhythm</span><h1>Two wheels.<br /><em>One unforgettable island.</em></h1><p>Reliable scooters, road bikes and adventure machines with safety gear and human support.</p></div></Reveal><Reveal delay={100} className="inner-hero__art" direction="right"><figure data-scroll-motion><Image src="/images/bike-road.webp" alt="Motorbike ready on a quiet forest road"  width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw"/><figcaption><span>Freedom, responsibly</span><strong>Helmet · Handover · Support</strong></figcaption></figure></Reveal></div></section>
      <section className="section section--sand modern-section"><div className="container fleet-intro"><div><span className="eyebrow"><i />Our fleet</span><h2>Choose the bike that fits your road.</h2></div><p>Valid motorcycle licence or international driving permit required. Deposit and final conditions are confirmed before pickup.</p></div><div className="container"><AnimatedCatalogGrid variant="bikes">{bikes.map((bike, index) => <BikeCard key={bike.id} bike={bike} index={index} />)}</AnimatedCatalogGrid></div></section>
      <section className="section rental-guide modern-section"><div className="container"><div className="rental-guide__head"><span className="eyebrow"><i />Before the first kilometre</span><h2>Everything you need to ride responsibly.</h2><p>We keep the process clear, inspect each bike and explain local road conditions before handover.</p></div><div className="rental-guide__grid"><article><span>01</span><h3>Licence check</h3><p>Bring your passport, valid motorcycle licence and international permit where required.</p></article><article><span>02</span><h3>Safety handover</h3><p>Bike inspection, controls, helmets, fuel guidance and emergency contacts.</p></article><article><span>03</span><h3>Island support</h3><p>Message our local team if plans change or you need route advice during the rental.</p></article><article><span>04</span><h3>Easy return</h3><p>Return at the agreed location and complete a quick joint condition check.</p></article></div></div></section>
    </>
  );
}
