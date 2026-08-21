import { SiteLoaderPanel } from "@/components/public/layout/SiteLoaderPanel";

export default function Loading() {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-busy="true">
      <SiteLoaderPanel message="Opening your page" />
    </div>
  );
}
