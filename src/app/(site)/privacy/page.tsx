import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How GH Tours & Bike Rental handles booking and contact information.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return <section className="section legal-page modern-section"><div className="container narrow"><span className="eyebrow"><i />Privacy</span><h1>Privacy policy</h1><p>Booking information is collected only to prepare quotations, manage reservations and communicate with you. Configure this page with your company&apos;s final legal policy before production launch.</p><h2>Information collected</h2><p>Name, email, phone number, travel dates, pickup details and any information voluntarily included in your request.</p><h2>Storage and access</h2><p>Data is stored in the configured MongoDB Atlas database and is accessible only to authorised administrators.</p><h2>Contact</h2><p>Contact the business directly to request access, correction or deletion of your information.</p></div></section>;
}
