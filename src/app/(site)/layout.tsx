import { PublicHeader } from "@/components/public/navigation/PublicHeader";
import { PublicFooter } from "@/components/public/navigation/PublicFooter";
import { ScrollExperience } from "@/components/public/motion/ScrollExperience";
import { getWebsiteContent } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getWebsiteContent();
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <PublicHeader content={content.global} />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <ScrollExperience />
      <PublicFooter content={content.global} />
    </>
  );
}
