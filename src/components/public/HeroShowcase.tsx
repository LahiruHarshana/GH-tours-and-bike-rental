import Link from "next/link";
import { MagneticLink } from "@/components/public/actions/MagneticLink";
import Image from "next/image";
import { CinematicHeading } from "@/components/public/typography/CinematicHeading";
import { CinematicFigure } from "@/components/public/media/CinematicFigure";
import { BrandMark } from "@/components/public/media/BrandMark";

export function HeroShowcase() {
  return (
    <section className="island-hero" aria-labelledby="home-hero-title" data-chapter="00">
      <div id="hero-sentinel" style={{ position: "absolute", top: 0, height: "80vh", width: 1, pointerEvents: "none" }} />

      <div className="island-hero__stage" data-scroll-3d>
        <div className="island-hero__layer island-hero__layer--bg">
          {/* [ASSET NEEDED] hero-coast.webp cut into 3 plates with alpha (sky / mid / near) for true parallax. Currently using flat two-layer fallback. */}
          <Image src="/images/hero-coast.webp" alt="Sri Lankan coastline at golden hour" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>

        <div className="island-hero__layer island-hero__layer--scrim">
          <span className="island-hero__wash" aria-hidden="true" />
          <span className="island-hero__bloom" aria-hidden="true" data-cursor-depth />
        </div>

        <div className="island-hero__layer island-hero__layer--copy">
          <div className="container island-hero__grid">
            <div className="island-hero__content">
              <div className="island-hero__topline">
                <span className="eyebrow island-hero__eyebrow"><i />Private Sri Lanka journeys</span>
                <span className="island-hero__greeting">ආයුබෝවන් <small>Ayubowan</small></span>
              </div>

              <CinematicHeading
                as="h1"
                lines={[
                  <span key="1">Sri Lanka,</span>,
                  <em key="2">at your pace.</em>
                ]}
                className="island-hero__title"
              />

              <div className="island-hero__lower">
                <p>Thoughtful private tours, calm airport arrivals and the freedom to explore with a local team beside you.</p>
                <div className="island-hero__actions">
                  <MagneticLink className="button button--gold" href="/contact">Plan a journey <span aria-hidden="true">↗</span></MagneticLink>
                  <Link className="text-link editorial-link" href="#island-story"><span>Watch the island</span><b aria-hidden="true">↓</b></Link>
                </div>
              </div>
            </div>

            <div className="island-hero__arch-wrap">
              <div className="island-hero__seal">
                <BrandMark />
              </div>
              <div className="island-hero__arch">
                {/* [ASSET NEEDED] A detail shot (e.g. textured flora, hands, fabric) instead of another wide landscape. */}
                <CinematicFigure
                  src="/images/train-hills.webp"
                  alt="Train passing through Sri Lankan hills"
                />
              </div>
            </div>
          </div>

          <div className="island-hero__chips container">
            <div className="island-hero__weather" aria-label="Example destination conditions">
              <span>Ella</span><i />22°C<i />Golden hour
            </div>
            <a className="island-hero__scroll" href="#island-story">
              <span>Begin the journey</span><i aria-hidden="true" />
            </a>
            <span className="island-hero__index" aria-hidden="true">06° 01&apos; N · 80° 47&apos; E</span>
          </div>
        </div>
      </div>
    </section>
  );
}
