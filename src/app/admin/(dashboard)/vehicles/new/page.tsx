import { VehicleForm } from "@/components/admin/VehicleForm";

export default function NewVehiclePage() {
  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Transfer vehicles</span>
          <h1>Add a vehicle</h1>
          <p>Create a budget, standard or luxury option and set passenger limits plus route prices.</p>
        </div>
      </div>
      <VehicleForm />
    </>
  );
}
