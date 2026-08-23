import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/public/motion/Reveal";
import { ServiceBar } from "@/components/public/navigation/ServiceBar";
import { CinematicHeading } from "@/components/public/typography/CinematicHeading";
import { WeligamaDestinationMarquee } from "@/components/public/weligama/WeligamaDestinationMarquee";
import { WeligamaRouteTimeline } from "@/components/public/weligama/WeligamaRouteTimeline";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  breadcrumbSchema,
  businessId,
  createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Weligama Tours, Airport Transfers & Bike Rental",
  description:
    "Plan your Weligama stay with one local team for Colombo airport transfers, scooter and motorbike rental, south-coast day trips and private Sri Lanka tours.",
  path: "/weligama",
  keywords: [
    "Weligama tours",
    "Weligama airport transfer",
    "Colombo airport to Weligama",
    "Weligama bike rental",
    "things to do Weligama",
    "Weligama travel agency",
  ],
});

const services = [
  {
    no: "01",
    title: "Airport transfer to Weligama",
    copy: "Private pickup from Bandaranaike International Airport with flight tracking, meet-and-greet and direct transport to your accommodation.",
    href: "/airport-hire",
    cta: "Book airport transfer",
    featured: true,
  },
  {
    no: "02",
    title: "Bike and scooter rental",
    copy: "Choose a suitable ride for Weligama, Mirissa, Midigama, Ahangama and other south-coast destinations, with a clear safety handover.",
    href: "/bikes",
    cta: "See available bikes",
    featured: false,
  },
  {
    no: "03",
    title: "Private tours from Weligama",
    copy: "Plan day trips or longer private journeys to Galle, Yala, Ella, the Cultural Triangle, tea country and the rest of Sri Lanka.",
    href: "/tours",
    cta: "Explore private tours",
    featured: false,
  },
] as const;

export default function WeligamaPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Weligama Travel Services", path: "/weligama" },
            ]),
            {
              "@type": "WebPage",
              "@id": absoluteUrl("/weligama#webpage"),
              url: absoluteUrl("/weligama"),
              name: "Weligama Tours, Airport Transfers & Bike Rental",
              description:
                "Local travel services for visitors staying in Weligama, Matara, Sri Lanka.",
              about: {
                "@type": "City",
                name: "Weligama",
                containedInPlace: {
                  "@type": "AdministrativeArea",
                  name: "Matara District, Sri Lanka",
                },
              },
              mainEntity: { "@id": businessId },
            },
          ],
        }}
      />

      <section
        className="weligama-hero modern-section"
        data-scroll-motion
        data-range="enter"
        aria-labelledby="weligama-hero-title"
      >
        <div className="weligama-hero__backdrop" aria-hidden="true">
          <Image
            src="/images/hero-south-coast-cinematic.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="weligama-hero__image"
          />
        </div>
        <div className="container weligama-hero__shell">
          <Reveal>
            <span className="weligama-hero__eyebrow">Local travel services in Matara</span>
            <CinematicHeading
              as="h1"
              id="weligama-hero-title"
              className="weligama-hero__title"
              lines={[
                <>Start in Weligama.</>,
                <em>See Sri Lanka.</em>,
              ]}
            />
            <p className="weligama-hero__lead">
              Airport transfers, bike rental, south-coast day trips and private
              island tours—arranged by one local team in Weligama.
            </p>
            <ul className="weligama-hero__tags" aria-label="Services available in Weligama">
              <li>Airport pickup</li>
              <li>Bike rental</li>
              <li>Private tours</li>
              <li>South-coast day trips</li>
            </ul>
            <div className="weligama-hero__actions">
              <Link href="#weligama-services" className="weligama-hero__cta">
                Explore services
                <span aria-hidden="true">↓</span>
              </Link>
              <Link href="/contact" className="weligama-hero__cta weligama-hero__cta--ghost">
                Plan from Weligama
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="weligama-hero__coords" aria-hidden="true">
          <span>Weligama Bay</span>
          <strong>5.973° N · 80.429° E</strong>
          <span>Indian Ocean · South Coast</span>
        </div>
      </section>

      <WeligamaDestinationMarquee />

      <ServiceBar />

      <section
        id="weligama-services"
        className="weligama-services modern-section"
        aria-labelledby="weligama-services-title"
      >
        <div className="container">
          <header className="weligama-services__head" data-cinema="rise">
            <div>
              <span className="eyebrow"><i />One point of contact</span>
              <h2 id="weligama-services-title">
                Everything you need to move from Weligama.
              </h2>
            </div>
            <p>
              Begin with your arrival, your days on the coast or the wider island
              route. We can arrange one service or connect the whole journey.
            </p>
          </header>
          <div className="weligama-services__grid">
            {services.map((service, index) => (
              <article
                key={service.no}
                className={`weligama-services__card${service.featured ? " weligama-services__card--featured" : ""}`}
                data-cinema="rise"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <span>{service.no}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <Link href={service.href}>
                  {service.cta}
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="weligama-routes modern-section"
        data-scroll-motion
        aria-labelledby="weligama-routes-title"
      >
        <div className="container weligama-routes__grid">
          <Reveal direction="left" className="weligama-routes__intro">
            <span className="eyebrow"><i />A useful south-coast base</span>
            <h2 id="weligama-routes-title">Where can you go from Weligama?</h2>
            <p>
              Weligama sits between several of the south coast&apos;s most visited
              places. Short local journeys can connect Mirissa, Midigama, Ahangama,
              Matara and Galle, while private day trips can reach inland culture
              and wildlife.
            </p>
          </Reveal>
          <WeligamaRouteTimeline />
        </div>
      </section>

      <section className="weligama-guide seo-guide modern-section" aria-labelledby="weligama-faq-title">
        <div className="container seo-faq">
          <h2 id="weligama-faq-title">Planning travel in Weligama</h2>
          <div>
            <details data-cinema="rise">
              <summary>Can you collect me from Colombo Airport and take me to Weligama?</summary>
              <p>
                Yes. Share your flight, date, passenger count and accommodation so
                we can confirm your private CMB airport pickup and quotation.
              </p>
            </details>
            <details data-cinema="rise" style={{ transitionDelay: "70ms" }}>
              <summary>Can I rent a scooter or motorbike in Weligama?</summary>
              <p>
                Yes, subject to availability and licence requirements. Rental duration,
                deposit, safety equipment, pickup and return details are confirmed
                before handover.
              </p>
            </details>
            <details data-cinema="rise" style={{ transitionDelay: "140ms" }}>
              <summary>Do private tours have to begin in Weligama?</summary>
              <p>
                No. Weligama is our local base, but pickup points and private
                itineraries can be planned around your accommodation and wider Sri
                Lanka route.
              </p>
            </details>
            <details data-cinema="rise" style={{ transitionDelay: "210ms" }}>
              <summary>Can you arrange a custom south-coast day trip?</summary>
              <p>
                Yes. Tell us the places or experiences that interest you, your group
                size and available time, and we will suggest a practical private route.
              </p>
            </details>
          </div>
          <Link className="button button--gold" href="/contact">
            Plan from Weligama
          </Link>
        </div>
      </section>
    </>
  );
}
