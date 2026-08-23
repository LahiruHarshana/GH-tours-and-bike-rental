import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AirportQuickBook } from "@/components/booking/AirportQuickBook";
import { BookingForm } from "@/components/booking/BookingForm";
import { Reveal } from "@/components/public/motion/Reveal";
import { AirportFareTable } from "@/components/public/collections/AirportFareTable";
import { AirportVehicleGallery } from "@/components/public/collections/AirportVehicleGallery";
import { ServiceBar } from "@/components/public/navigation/ServiceBar";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  breadcrumbSchema,
  businessId,
  createPageMetadata,
} from "@/lib/seo";

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

const steps = [
  {
    no: "01",
    title: "Choose your town",
    copy: "Weligama, Hikkaduwa, Hiriketiya, Arugam Bay, Kandy, Sigiriya, Bentota and nearby towns.",
  },
  {
    no: "02",
    title: "Pick a vehicle",
    copy: "Budget or premium car for 1–3 people, or a van for up to 7.",
  },
  {
    no: "03",
    title: "Meet your driver",
    copy: "Your name board is waiting in the arrivals hall—even when the flight is delayed.",
  },
] as const;

export default function AirportHirePage() {
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

      <section className="airport-hire-hero modern-section" data-scroll-motion data-range="enter">
        <div className="airport-hire-hero__backdrop" aria-hidden="true">
          <Image
            src="/images/south-coast.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="airport-hire-hero__image"
          />
        </div>
        <div className="container airport-hire-hero__shell">
          <Reveal>
            <span className="airport-hire-hero__eyebrow">Sri Lanka airport transfer</span>
            <h1>
              Colombo airport
              <br />
              <em>to Weligama.</em>
            </h1>
            <p className="airport-hire-hero__lead">
              Flight-tracked private transfers from Bandaranaike International Airport (CMB) to
              Weligama, the south coast and destinations across Sri Lanka.
            </p>
            <ul className="airport-hire-hero__tags" aria-label="Transfer highlights">
              <li>Flight tracked</li>
              <li>Meet &amp; greet</li>
              <li>Fixed fare in LKR</li>
            </ul>
            <Link href="#book" className="airport-hire-hero__cta">
              Book your transfer
              <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <ServiceBar active="airport" />

      <section
        id="book"
        className="airport-hire-quickbook ss-airport-booking modern-section"
        aria-label="Quick airport booking"
      >
        <div className="container">
          <Reveal>
            <AirportQuickBook />
          </Reveal>
        </div>
      </section>

      <section className="airport-hire-steps modern-section" data-scroll-motion aria-labelledby="airport-steps-title">
        <div className="container">
          <header className="airport-hire-steps__head" data-cinema="rise">
            <span className="eyebrow"><i />Simple from the start</span>
            <h2 id="airport-steps-title">Private airport pickup, planned before you land.</h2>
            <p>
              Choose the town you are heading to, then a budget car, premium car or van. The fare
              is shown in Sri Lankan rupees before you send the request.
            </p>
          </header>
          <div className="airport-hire-steps__grid">
            {steps.map((step, index) => (
              <article
                key={step.no}
                className="airport-hire-steps__card"
                data-cinema="rise"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span>{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="airport-hire-booking modern-section" aria-labelledby="airport-request-title">
        <div className="container airport-hire-booking__grid">
          <Reveal className="airport-hire-booking__copy">
            <span className="eyebrow"><i />Full request form</span>
            <h2 id="airport-request-title">Send every detail in one request.</h2>
            <p>
              Add your flight number, hotel name and vehicle choice. We confirm the driver,
              meeting point and final fare on WhatsApp—usually within 15–30 minutes.
            </p>
            <ul className="airport-hire-booking__list">
              <li>Listed fares in Sri Lankan rupees</li>
              <li>Budget car, premium car or van</li>
              <li>Flight delays tracked automatically</li>
            </ul>
          </Reveal>
          <Reveal delay={100} className="airport-hire-booking__panel">
            <div className="airport-hire-booking__panel-head">
              <strong>Airport transfer request</strong>
              <small>We normally reply within 15–30 minutes.</small>
            </div>
            <BookingForm type="AIRPORT" />
          </Reveal>
        </div>
      </section>

      <section
        className="airport-hire-fleet modern-section"
        data-scroll-motion
        aria-labelledby="airport-fleet-title"
      >
        <div className="container">
          <header className="airport-hire-fleet__head" data-cinema="rise">
            <span className="eyebrow"><i />Sized to your group</span>
            <h2 id="airport-fleet-title">Budget car, premium car or van.</h2>
            <p>Private vehicles with meet-and-greet, luggage space and a clear quoted fare before you travel.</p>
          </header>
          <AirportVehicleGallery />
        </div>
      </section>

      <section className="airport-hire-fares modern-section" aria-labelledby="airport-fares-title">
        <div className="container">
          <header className="airport-hire-fares__head" data-cinema="rise">
            <span className="eyebrow"><i />Listed fares from CMB</span>
            <h2 id="airport-fares-title">Check the price for your town, then book.</h2>
          </header>
          <div className="airport-hire-fares__shell" data-scroll-motion data-range="enter">
            <p className="airport-hire-fares__hint">Swipe to compare fares →</p>
            <AirportFareTable />
          </div>
        </div>
      </section>

      <section className="airport-hire-guide seo-guide modern-section" aria-labelledby="airport-guide-title">
        <div className="container seo-guide__grid">
          <div data-cinema="rise">
            <span className="eyebrow"><i />CMB to the south coast</span>
            <h2 id="airport-guide-title">Colombo Airport to Weligama without the arrival stress.</h2>
          </div>
          <div className="seo-guide__copy" data-cinema="rise">
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
              <p>Choose your town from the list, then a budget car, premium car or van. The fare is shown in Sri Lankan rupees. We send the vehicle details on WhatsApp and confirm any extras before you travel.</p>
            </details>
            <details>
              <summary>What if my hotel is near a listed town?</summary>
              <p>Pick the nearest town on the list and add your hotel or villa name. Nearby places such as Midigama, Unawatuna or Pottuvil use the same listed fare as the town they sit beside.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
