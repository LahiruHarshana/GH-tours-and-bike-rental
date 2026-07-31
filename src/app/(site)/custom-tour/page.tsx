import { CustomTourForm } from "@/components/booking/CustomTourForm";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Design Your Custom Sri Lanka Tour",
  description: "Create your perfect Sri Lanka journey. Tell us where you want to go and what you need, and our local team will handle the rest.",
  path: "/custom-tour",
});

import { Reveal } from "@/components/public/motion/Reveal";

export default function CustomTourPage() {
  return (
    <>
      <section className="simple-hero modern-section">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow--light"><i />Custom Journey</span>
            <h1>Design your perfect tour</h1>
            <p>Tell us where you want to go and what you need. We'll craft a tailor-made itinerary and get back to you with the details.</p>
          </Reveal>
        </div>
      </section>

      <section className="section modern-section" style={{ paddingBottom: "100px" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal delay={100} direction="up">
            <div className="booking-panel">
              <div className="booking-panel__head">
                <span>Custom tour request</span>
                <small>Select your destinations and preferences.</small>
              </div>
              <CustomTourForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

