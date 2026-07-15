import Link from "next/link";
import { MagneticLink } from "@/components/ui/MagneticLink";

export function HeroShowcase() {
  return (
    <section className="island-hero home-hero" aria-labelledby="home-hero-title">
      <div className="island-hero__media" data-scroll-motion aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-coast.jpg" alt="" fetchPriority="high" />
      </div>
      <span className="island-hero__wash" aria-hidden="true" />
      <span className="island-hero__grain" aria-hidden="true" />
      <span className="island-hero__sun" aria-hidden="true" data-cursor-depth />

      <div className="container island-hero__grid island-hero__grid--cover">
        <div className="island-hero__copy">
          <div className="island-hero__topline">
            <span className="eyebrow island-hero__eyebrow"><i />Private Sri Lanka journeys</span>
            <span className="island-hero__greeting">ආයුබෝවන් <small>Ayubowan</small></span>
          </div>
          <h1 id="home-hero-title">
            <span>Sri Lanka,</span>
            <em>at your pace.</em>
          </h1>
          <div className="island-hero__lower">
            <p>Thoughtful private tours, calm airport arrivals and the freedom to explore with a local team beside you.</p>
            <div className="island-hero__actions">
              <MagneticLink className="button button--gold" href="/contact">Plan a journey <span aria-hidden="true">↗</span></MagneticLink>
              <Link className="text-link editorial-link" href="#island-story"><span>Watch the island</span><b aria-hidden="true">↓</b></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="island-hero__weather" aria-label="Example destination conditions">
        <span>Ella</span><i />22°C<i />Golden hour
      </div>
      <a className="island-hero__scroll" href="#book-airport"><span>Begin the journey</span><i aria-hidden="true" /></a>
      <span className="island-hero__index" aria-hidden="true">06° 01&apos; N · 80° 47&apos; E</span>
    </section>
  );
}
