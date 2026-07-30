import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/public/motion/Reveal";
import { ServiceBar } from "@/components/public/navigation/ServiceBar";
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

      <section className="inner-hero inner-hero--weligama modern-section">
        <div className="container inner-hero__grid">
          <Reveal>
            <div>
              <span className="eyebrow eyebrow--light">
                <i />
                Local travel services in Matara
              </span>
              <h1>
                Start in Weligama.
                <br />
                <em>See Sri Lanka.</em>
              </h1>
              <p>
                Airport transfers, bike rental, south-coast day trips and
                private island tours—arranged by one local team in Weligama.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100} className="inner-hero__art" direction="right">
            <figure data-scroll-motion>
              <Image
                src="/images/hero-coast.webp"
                alt="The palm-lined coast near Weligama in Matara, Sri Lanka"
                width={1920}
                height={1280}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <figcaption>
                <span>Weligama · 5.973° N</span>
                <strong>Airport · Tours · Bikes</strong>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <ServiceBar />

      <section className="section weligama-services modern-section" aria-labelledby="weligama-services-title">
        <div className="container weligama-services__intro">
          <div>
            <span className="eyebrow"><i />One point of contact</span>
            <h2 id="weligama-services-title">Everything you need to move from Weligama.</h2>
          </div>
          <p>
            Begin with your arrival, your days on the coast or the wider island
            route. We can arrange one service or connect the whole journey.
          </p>
        </div>

        <div className="container weligama-services__grid">
          <article>
            <span>01</span>
            <h3>Airport transfer to Weligama</h3>
            <p>Private pickup from Bandaranaike International Airport with flight tracking, meet-and-greet and direct transport to your accommodation.</p>
            <Link href="/airport-hire">Book airport transfer <b aria-hidden="true">→</b></Link>
          </article>
          <article>
            <span>02</span>
            <h3>Bike and scooter rental</h3>
            <p>Choose a suitable ride for Weligama, Mirissa, Midigama, Ahangama and other south-coast destinations, with a clear safety handover.</p>
            <Link href="/bikes">See available bikes <b aria-hidden="true">→</b></Link>
          </article>
          <article>
            <span>03</span>
            <h3>Private tours from Weligama</h3>
            <p>Plan day trips or longer private journeys to Galle, Yala, Ella, the Cultural Triangle, tea country and the rest of Sri Lanka.</p>
            <Link href="/tours">Explore private tours <b aria-hidden="true">→</b></Link>
          </article>
        </div>
      </section>

      <section className="section weligama-guide modern-section" aria-labelledby="weligama-guide-title">
        <div className="container weligama-guide__grid">
          <Reveal direction="left">
            <div>
              <span className="eyebrow"><i />A useful south-coast base</span>
              <h2 id="weligama-guide-title">Where can you go from Weligama?</h2>
              <p>
                Weligama sits between several of the south coast&apos;s most
                visited places. Short local journeys can connect Mirissa,
                Midigama, Ahangama, Matara and Galle, while private day trips can
                reach inland culture and wildlife.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80} direction="right">
            <div className="weligama-route-list">
              <div><strong>Mirissa</strong><span>Beaches, harbour and coastal viewpoints</span></div>
              <div><strong>Midigama &amp; Ahangama</strong><span>Surf breaks, cafés and small coves</span></div>
              <div><strong>Galle Fort</strong><span>Heritage streets and an evening by the ramparts</span></div>
              <div><strong>Yala region</strong><span>A private wildlife day trip or onward journey</span></div>
              <div><strong>Ella</strong><span>Hill-country landscapes beyond the coast</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section seo-guide modern-section">
        <div className="container seo-faq" aria-labelledby="weligama-faq-title">
          <h2 id="weligama-faq-title">Planning travel in Weligama</h2>
          <div>
            <details>
              <summary>Can you collect me from Colombo Airport and take me to Weligama?</summary>
              <p>Yes. Share your flight, date, passenger count and accommodation so we can confirm your private CMB airport pickup and quotation.</p>
            </details>
            <details>
              <summary>Can I rent a scooter or motorbike in Weligama?</summary>
              <p>Yes, subject to availability and licence requirements. Rental duration, deposit, safety equipment, pickup and return details are confirmed before handover.</p>
            </details>
            <details>
              <summary>Do private tours have to begin in Weligama?</summary>
              <p>No. Weligama is our local base, but pickup points and private itineraries can be planned around your accommodation and wider Sri Lanka route.</p>
            </details>
            <details>
              <summary>Can you arrange a custom south-coast day trip?</summary>
              <p>Yes. Tell us the places or experiences that interest you, your group size and available time, and we will suggest a practical private route.</p>
            </details>
          </div>
          <Link className="button button--gold" href="/contact">Plan from Weligama</Link>
        </div>
      </section>
    </>
  );
}
