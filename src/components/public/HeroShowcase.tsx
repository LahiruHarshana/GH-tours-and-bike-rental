import Link from "next/link";
import { MagneticLink } from "@/components/ui/MagneticLink";

export function HeroShowcase() {
  return (
    <section className="island-hero home-hero" aria-labelledby="home-hero-title">
      <span className="island-hero__wash" aria-hidden="true" />
      <span className="island-hero__sun" aria-hidden="true" data-scroll-motion />
      <span className="island-hero__route" aria-hidden="true"><i /><i /><i /><i /></span>

      <div className="container island-hero__grid">
        <div className="island-hero__copy">
          <span className="eyebrow island-hero__eyebrow"><i />Private Sri Lanka journeys</span>
          <h1 id="home-hero-title">
            <span>Sri Lanka,</span>
            <em>at your pace.</em>
          </h1>
          <p>Thoughtful private tours, calm airport arrivals and the freedom to explore with a local team beside you.</p>
          <div className="island-hero__actions">
            <MagneticLink className="button button--dark" href="/contact">Design my journey <span aria-hidden="true">↗</span></MagneticLink>
            <Link className="text-link text-link--dark editorial-link" href="/tours"><span>Explore the island</span><b aria-hidden="true">→</b></Link>
          </div>
          <div className="island-hero__proof" aria-label="Service highlights">
            <div><strong>4.9</strong><span>Guest rating</span></div>
            <div><strong>24/7</strong><span>Local support</span></div>
            <div><strong>Private</strong><span>Flexible travel</span></div>
          </div>
        </div>

        <div className="island-hero__visual" data-scroll-motion>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-coast.jpg" alt="Palm-fringed bay on Sri Lanka's southern coast" fetchPriority="high" />
            <figcaption>
              <span>Southern coast · Sri Lanka</span>
              <strong>Start with the road.<br />Keep room for discovery.</strong>
            </figcaption>
          </figure>
          <div className="island-hero__postcard">
            <span>06° 01&apos; N</span>
            <strong>Indian Ocean light</strong>
            <small>Warm roads · Open plans</small>
          </div>
          <div className="island-hero__seal" aria-hidden="true"><span>GH · ISLAND IN MOTION ·</span><i /></div>
        </div>
      </div>

      <a className="island-hero__scroll" href="#book-airport"><span>Begin the journey</span><i aria-hidden="true" /></a>
      <span className="island-hero__index" aria-hidden="true">01 / 08</span>
    </section>
  );
}
