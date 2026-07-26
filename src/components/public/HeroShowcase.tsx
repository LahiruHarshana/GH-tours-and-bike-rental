import { MagneticLink } from "@/components/public/actions/MagneticLink";
import Image from "next/image";
import { CinematicHeading } from "@/components/public/typography/CinematicHeading";

const heroScenes = [
  {
    src: "/images/hero-sigiriya-cinematic.webp",
    alt: "Sigiriya rock fortress rising above Sri Lanka's green central plains",
    place: "Sigiriya",
    note: "Ancient wonder",
  },
  {
    src: "/images/hero-south-coast-cinematic.webp",
    alt: "Turquoise surf curling along Sri Lanka's palm-fringed south coast",
    place: "South coast",
    note: "Indian Ocean",
  },
  {
    src: "/images/hero-tea-country-cinematic.webp",
    alt: "A traveller looking across the tea-covered hills of Sri Lanka",
    place: "Tea country",
    note: "Highland trails",
  },
] as const;

export function HeroShowcase() {
  return (
    <section
      className="island-hero-modern"
      aria-labelledby="home-hero-title"
      data-chapter="00"
      data-scroll-3d="hero"
    >
      <div className="island-hero-modern__media">
        {heroScenes.map((scene, index) => (
          <div
            className="island-hero-modern__scene"
            style={{ "--scene": index } as React.CSSProperties}
            key={scene.src}
          >
            <Image
              src={scene.src}
              alt={scene.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
        <div className="island-hero-modern__overlay"></div>
        <div className="island-hero-modern__light" aria-hidden="true" />
        <div className="island-hero-modern__grain" aria-hidden="true" />
      </div>

      <div className="island-hero-modern__frame" aria-hidden="true">
        <span>7.8731° N</span>
        <i />
        <span>80.7718° E</span>
      </div>

      <span className="island-hero-modern__ghost" aria-hidden="true">LANKA</span>

      <div className="island-hero-modern__content container">
        <div className="island-hero-modern__topline">
          <span className="eyebrow island-hero-modern__eyebrow"><i />Private Sri Lanka journeys</span>
        </div>

        <CinematicHeading
          as="h1"
          lines={[
            <span key="1">Sri Lanka,</span>,
            <em key="2">at your pace.</em>
          ]}
          className="island-hero-modern__title"
        />

        <div className="island-hero-modern__lower">
          <p>Private journeys, shaped around your pace.</p>
          <div className="island-hero-modern__actions">
            <MagneticLink className="button button--gold" href="/contact">Plan a journey <span className="island-hero-modern__arrow" aria-hidden="true">↗</span></MagneticLink>
          </div>
        </div>
      </div>

      <div className="island-hero-modern__chips container">
        <div className="island-hero-modern__scene-meta" aria-hidden="true">
          <span className="island-hero-modern__scene-count">0<span aria-hidden="true" /> / 03</span>
          <div className="island-hero-modern__scene-copy">
            {heroScenes.map((scene, index) => (
              <span
                className="island-hero-modern__scene-label"
                style={{ "--scene": index } as React.CSSProperties}
                key={scene.place}
              >
                <strong>{scene.place}</strong>
                <small>{scene.note}</small>
              </span>
            ))}
          </div>
          <span className="island-hero-modern__scene-line"><i /></span>
        </div>
        <a className="island-hero-modern__scroll" href="#island-story">
          <span>Begin the journey</span>
          <i aria-hidden="true"><b /></i>
        </a>
        <div className="island-hero-modern__reel" aria-hidden="true">
          {heroScenes.map((scene, index) => (
            <span style={{ "--scene": index } as React.CSSProperties} key={scene.place}><i /></span>
          ))}
        </div>
      </div>
    </section>
  );
}
