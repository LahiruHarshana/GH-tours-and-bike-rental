import { PublicHeader } from "@/components/public/navigation/PublicHeader";
import { PublicFooter } from "@/components/public/navigation/PublicFooter";
import { ScrollExperience } from "@/components/public/motion/ScrollExperience";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <PublicHeader />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <ScrollExperience />
      <PublicFooter />
    </>
  );
}
