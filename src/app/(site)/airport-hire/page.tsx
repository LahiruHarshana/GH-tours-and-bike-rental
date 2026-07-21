import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/BookingForm";
import { Reveal } from "@/components/public/motion/Reveal";
import Image from "next/image";

export const metadata: Metadata = { title: "Sri Lanka Airport Hire", description: "Book a reliable private transfer from Colombo Bandaranaike International Airport." };

export default function AirportHirePage() {
  return (
    <>
      <section className="inner-hero inner-hero--airport modern-section">
        <div className="container inner-hero__grid">
          <Reveal><div><span className="eyebrow eyebrow--light"><i />Bandaranaike International Airport</span><h1>Your driver waits.<br /><em>Your holiday begins.</em></h1><p>Flight-tracked private transfers from CMB airport to every corner of Sri Lanka.</p></div></Reveal>
          <Reveal delay={100} className="inner-hero__art" direction="right"><figure data-scroll-motion><Image src="/images/south-coast.webp" alt="The Sri Lankan coast waiting beyond the airport"  width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw"/><figcaption><span>CMB</span><strong>Flight tracked · Driver waiting</strong></figcaption></figure></Reveal>
        </div>
      </section>
      <section className="section airport-page modern-section">
        <div className="container airport-page__grid">
          <Reveal className="airport-page__copy">
            <span className="eyebrow"><i />Simple from the start</span>
            <h2>Book in two minutes. Arrive with confidence.</h2>
            <p>Send your flight and destination details. We confirm the vehicle, driver contact and fixed quotation before your travel date.</p>
            <div className="process-list">
              <article><span>01</span><div><h3>Send your arrival</h3><p>Flight number, date, passengers and destination.</p></div></article>
              <article><span>02</span><div><h3>Receive confirmation</h3><p>A clear quotation and your pickup instructions by WhatsApp.</p></div></article>
              <article><span>03</span><div><h3>Meet your driver</h3><p>Your name board is waiting in the arrivals hall—even when the flight is delayed.</p></div></article>
            </div>
            <div className="vehicle-pills"><span>Comfort car · 1–3</span><span>Private van · 1–7</span><span>Minibus · 8–18</span></div>
          </Reveal>
          <Reveal delay={100} className="booking-panel">
            <div className="booking-panel__head"><span>Airport transfer request</span><small>We normally reply within 15–30 minutes.</small></div>
            <BookingForm type="AIRPORT" />
          </Reveal>
        </div>
      </section>
      <section className="route-prices modern-section"><div className="container"><span className="eyebrow"><i />From arrivals to island life</span><h2>Popular first roads</h2><div className="route-grid"><article><span>CMB</span><b>→</b><div><strong>Colombo</strong><small>Approx. 45–75 min</small></div></article><article><span>CMB</span><b>→</b><div><strong>Galle</strong><small>Approx. 2–2.5 hrs</small></div></article><article><span>CMB</span><b>→</b><div><strong>Kandy</strong><small>Approx. 3–4 hrs</small></div></article><article><span>CMB</span><b>→</b><div><strong>Ella</strong><small>Approx. 5–6 hrs</small></div></article></div></div></section>
    </>
  );
}
