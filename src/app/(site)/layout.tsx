import { PublicHeader } from "@/components/public/navigation/PublicHeader";
import { PublicFooter } from "@/components/public/navigation/PublicFooter";
import { ScrollExperience } from "@/components/public/motion/ScrollExperience";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <ScrollExperience />
      <PublicFooter />
    </>
  );
}
