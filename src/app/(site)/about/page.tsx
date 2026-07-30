import type { Metadata } from "next";
import { Reveal } from "@/components/public/motion/Reveal";
import { ServiceBar } from "@/components/public/navigation/ServiceBar";
import { createPageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata: Metadata = createPageMetadata({
  title: "About GH Tours Weligama",
  description:
    "Meet the local Weligama team behind GH Tours & Bike Rental, arranging private Sri Lanka tours, airport transfers and bike rentals from Matara.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="simple-hero simple-hero--story">
        <div className="simple-hero__media" aria-hidden="true"><Image src="/images/train-hills.webp" alt=""  width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw"/></div>
        <div className="container"><Reveal><span className="eyebrow eyebrow--light"><i />Based in Weligama, Matara</span><h1>Local knowledge.<br /><em>Genuine welcome.</em></h1><p>Sri Lanka is our home. Your journey should feel like your own.</p></Reveal></div>
      </section>
      <ServiceBar />
      <section className="section about-page modern-section">
        <div className="container about-page__grid">
          <Reveal direction="left"><figure data-scroll-motion><Image src="/images/hero-coast.webp" alt="Palm trees and the Indian Ocean near Weligama on Sri Lanka's southern coast"  width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw"/><figcaption>Weligama · Matara · Sri Lanka</figcaption></figure></Reveal>
          <Reveal delay={100} direction="right"><div><span className="eyebrow"><i />Our philosophy</span><h2>We want you to remember how Sri Lanka felt.</h2><p className="lead-copy">Not only the places you photographed, but the tea shared by the roadside, the sudden rain over a temple roof and the driver who knew exactly where to stop for sunset.</p><p>Based in the Weligama area of Matara, GH Tours & Bike Rental is built around private, flexible travel. We combine dependable operations with the warmth and spontaneity that make Sri Lanka special.</p><div className="about-values"><span><strong>Respect</strong>For guests, communities and the island.</span><span><strong>Clarity</strong>Honest plans, prices and communication.</span><span><strong>Care</strong>Real support from arrival to departure.</span></div></div></Reveal>
        </div>
      </section>
      <section className="section about-notes modern-section">
        <div className="container about-notes__head"><span className="eyebrow"><i />How we work</span><h2>Planned carefully.<br />Kept human.</h2></div>
        <div className="container about-notes__grid"><Reveal><article><span>01</span><h3>Listen first</h3><p>We begin with your dates, pace and priorities—not a pre-written script.</p></article></Reveal><Reveal delay={80}><article><span>02</span><h3>Know the road</h3><p>Local seasons, travel times and small details shape a better route.</p></article></Reveal><Reveal delay={160}><article><span>03</span><h3>Stay close</h3><p>A real person remains available before, during and after your booking.</p></article></Reveal></div>
      </section>
    </>
  );
}
