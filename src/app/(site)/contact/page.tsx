import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/BookingForm";
import { Reveal } from "@/components/public/motion/Reveal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Plan Your Journey" };

export default function ContactPage() {
  return (
    <>
      <section className="simple-hero simple-hero--contact modern-section"><div className="container"><Reveal><span className="eyebrow eyebrow--light"><i />Talk to a local planner</span><h1>Tell us your dates.<br /><em>We will shape the journey.</em></h1><p>A few details are enough to begin. A real person takes it from there.</p></Reveal></div></section>
      <section className="section contact-page modern-section">
        <div className="container contact-page__grid">
          <Reveal direction="left"><div><span className="eyebrow"><i />Begin anywhere</span><h2>Start with what you know.</h2><p>You do not need a finished itinerary. Send your dates, group size and the places or experiences that matter to you.</p><div className="contact-cards"><a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>{siteConfig.phone}</strong><small>Fastest response ↗</small></a><a href={`mailto:${siteConfig.email}`}><span>Email</span><strong>{siteConfig.email}</strong><small>For detailed plans ↗</small></a></div><div className="contact-note"><span>What happens next?</span><p>We review the request, ask any useful questions and reply with a clear direction—without asking for payment.</p></div></div></Reveal>
          <Reveal delay={100} direction="right"><div className="booking-panel"><div className="booking-panel__head"><span>Custom tour request</span><small>Use the notes field to describe your ideal route.</small></div><BookingForm type="TOUR" sourceTitle="Custom Sri Lanka Journey" /></div></Reveal>
        </div>
      </section>
    </>
  );
}
