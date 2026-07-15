import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ScrollExperience } from "@/components/ui/ScrollExperience";
import { IslandMarquee } from "@/components/public/IslandMarquee";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <ScrollExperience />
      <IslandMarquee />
      <PublicFooter />
    </>
  );
}
