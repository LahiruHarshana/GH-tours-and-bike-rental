import { CustomTourForm } from "@/components/booking/CustomTourForm";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Design Your Custom Sri Lanka Tour",
  description: "Create your perfect Sri Lanka journey. Tell us where you want to go and what you need, and our local team will handle the rest.",
  path: "/custom-tour",
});

export default function CustomTourPage() {
  return (
    <div className="stayscape-page ss-contact-page">
      <header className="ss-page-header">
        <div className="ss-page-header__inner">
          <p className="ss-page-header__kicker">Custom Journey</p>
          <h1 className="ss-page-header__title">Design your perfect tour</h1>
          <p className="ss-page-header__lead">
            Tell us where you want to go and what you need. We'll craft a tailor-made itinerary and get back to you with the details.
          </p>
        </div>
      </header>

      <section className="ss-page-content" style={{ paddingBottom: "100px", maxWidth: "800px", margin: "0 auto" }}>
        <CustomTourForm />
      </section>
    </div>
  );
}
