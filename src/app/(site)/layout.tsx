import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ScrollExperience } from "@/components/ui/ScrollExperience";

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
