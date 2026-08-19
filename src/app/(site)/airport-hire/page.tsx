import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking/BookingForm";
import { Reveal } from "@/components/public/motion/Reveal";
import { ServiceBar } from "@/components/public/navigation/ServiceBar";
import { AirportVehicleGallery } from "@/components/public/collections/AirportVehicleGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAirportVehicles } from "@/lib/data";
import {
  absoluteUrl,
  breadcrumbSchema,
  businessId,
  createPageMetadata,
} from "@/lib/seo";
import Image from "next/image";

export const metadata: Metadata = createPageMetadata({
  title: "Sri Lanka Airport Transfer to Weligama & Islandwide",
  description:
    "Book a private CMB airport transfer to Weligama, Mirissa, Galle, Ella, Kandy or anywhere in Sri Lanka. Flight tracking, meet-and-greet and a confirmed quote.",
  path: "/airport-hire",
  keywords: [
    "Sri Lanka airport transfer",
    "Colombo airport to Weligama taxi",
    "CMB airport transfer",
    "airport hire Sri Lanka",
    "Bandaranaike airport taxi",
  ],
});

export const dynamic = "force-dynamic";

export default async function AirportHirePage() {
  const vehicles = await getAirportVehicles();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Sri Lanka Airport Transfer", path: "/airport-hire" },
            ]),
            {
              "@type": "Service",
              "@id": absoluteUrl("/airport-hire#service"),
              name: "Private Sri Lanka Airport Transfer",
              alternateName: "Colombo Airport to Weligama Taxi",
              description:
                "Private airport pickup from Bandaranaike International Airport to Weligama and destinations across Sri Lanka.",
              url: absoluteUrl("/airport-hire"),
              provider: { "@id": businessId },
              areaServed: { "@type": "Country", name: "Sri Lanka" },
              serviceType: [
                "Airport transfer",
                "Private airport taxi",
                "Airport pickup and drop-off",
              ],
            },
          ],
        }}
      />
      <section className="inner-hero inner-hero--airport modern-section">
        <div className="container inner-hero__grid">
          <Reveal><div><span className="eyebrow eyebrow--light"><i />Sri Lanka airport transfer</span><h1>Colombo airport<br /><em>to Weligama.</em></h1><p>Flight-tracked private transfers from Bandaranaike International Airport (CMB) to Weligama, the south coast and destinations across Sri Lanka.</p></div></Reveal>
          <Reveal delay={100} className="inner-hero__art" direction="right"><figure data-scroll-motion><Image src="/images/south-coast.webp" alt="Private airport transfer to Weligama on Sri Lanka's south coast"  width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw"/><figcaption><span>CMB → Weligama</span><strong>Flight tracked · Driver waiting</strong></figcaption></figure></Reveal>
        </div>
      </section>
      <ServiceBar active="airport" />
      <section className="section airport-page modern-section">
        <div className="container airport-page__grid">
          <Reveal className="airport-page__copy">
            <span className="eyebrow"><i />Simple from the start</span>
            <h2>Private airport pickup, planned before you land.</h2>
            <p>Send your flight, passenger count and destination. Choose a budget, standard or luxury vehicle that fits your group, then we confirm the driver, meeting point and fare before you travel.</p>
            <div className="process-list">
              <article><span>01</span><div><h3>Send your arrival</h3><p>Flight number, date, passengers and destination.</p></div></article>
              <article><span>02</span><div><h3>Choose your vehicle</h3><p>Budget, standard or luxury — sized to your group.</p></div></article>
              <article><span>03</span><div><h3>Meet your driver</h3><p>Your name board is waiting in the arrivals hall—even when the flight is delayed.</p></div></article>
            </div>
          </Reveal>
          <Reveal delay={100} className="booking-panel">
            <div className="booking-panel__head"><span>Airport transfer request</span><small>We normally reply within 15–30 minutes.</small></div>
            <BookingForm type="AIRPORT" vehicles={vehicles} />
          </Reveal>
        </div>
      </section>
      <section className="route-prices modern-section">
        <div className="container">
          <span className="eyebrow"><i />Sized to your group</span>
          <h2>Budget, standard and luxury for every vehicle.</h2>
          <AirportVehicleGallery vehicles={vehicles} />
        </div>
      </section>
      <section className="route-prices modern-section"><div className="container"><span className="eyebrow"><i />From arrivals to island life</span><h2>Popular airport transfer routes</h2><div className="route-grid"><article><span>CMB</span><b>→</b><div><strong>Weligama</strong><small>Approx. 2.5–3 hrs</small></div></article><article><span>CMB</span><b>→</b><div><strong>Galle</strong><small>Approx. 2–2.5 hrs</small></div></article><article><span>CMB</span><b>→</b><div><strong>Kandy</strong><small>Approx. 3–4 hrs</small></div></article><article><span>CMB</span><b>→</b><div><strong>Ella</strong><small>Approx. 5–6 hrs</small></div></article></div></div></section>
      <section className="section seo-guide modern-section" aria-labelledby="airport-guide-title">
        <div className="container seo-guide__grid">
          <div>
            <span className="eyebrow"><i />CMB to the south coast</span>
            <h2 id="airport-guide-title">Colombo Airport to Weligama without the arrival stress.</h2>
          </div>
          <div className="seo-guide__copy">
            <p>
              Weligama is on Sri Lanka&apos;s southern coast in Matara District.
              A private airport transfer normally follows the expressway and
              takes around 2.5 to 3 hours, depending on traffic, weather and your
              exact accommodation.
            </p>
            <p>
              Your pickup is arranged from the CMB arrivals hall. Share your
              flight number so the driver can track changes, meet you with a
              name board and take you directly to your hotel, villa or surf camp
              in Weligama, Mirissa, Ahangama, Midigama or nearby.
            </p>
            <Link className="button button--dark" href="/weligama">
              See our Weligama travel services
            </Link>
          </div>
        </div>
        <div className="container seo-faq" aria-labelledby="airport-faq-title">
          <h2 id="airport-faq-title">Sri Lanka airport transfer questions</h2>
          <div>
            <details>
              <summary>Can I book a Colombo Airport to Weligama transfer?</summary>
              <p>Yes. Send your arrival date, flight number, passenger count and Weligama accommodation. We confirm the vehicle, meeting instructions and quotation before travel.</p>
            </details>
            <details>
              <summary>What happens if my flight is delayed?</summary>
              <p>We use the flight number you provide to follow arrival changes and coordinate the adjusted pickup time with the driver.</p>
            </details>
            <details>
              <summary>Do you provide airport transfers beyond Weligama?</summary>
              <p>Yes. Private pickups and drop-offs can be arranged for Galle, Mirissa, Ahangama, Ella, Kandy, Colombo and other destinations across Sri Lanka.</p>
            </details>
            <details>
              <summary>How is the airport transfer price confirmed?</summary>
              <p>Your quotation is prepared from the route, passenger number, luggage and the vehicle you choose — budget taxi, standard or luxury. The full details are confirmed before your travel date.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
