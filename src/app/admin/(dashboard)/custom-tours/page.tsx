import { CustomTourManager } from "@/components/admin/CustomTourManager";
import { getCustomTours } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminCustomToursPage() {
  const customTours = await getCustomTours();
  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Guest operations</span>
          <h1>Custom Tours</h1>
          <p>Review customer requests, provide quotes, and manage bespoke journeys.</p>
        </div>
      </div>
      <CustomTourManager customTours={customTours} />
    </>
  );
}
