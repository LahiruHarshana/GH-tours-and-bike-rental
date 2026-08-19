import { notFound } from "next/navigation";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { getAirportVehicleById } from "@/lib/data";

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = await getAirportVehicleById(id);
  if (!vehicle) notFound();
  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Transfer vehicles</span>
          <h1>Edit {vehicle.name}</h1>
          <p>Update capacity, pricing tiers and public availability.</p>
        </div>
      </div>
      <VehicleForm vehicle={vehicle} />
    </>
  );
}
