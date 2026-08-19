import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { SeedVehiclesButton } from "@/components/admin/SeedVehiclesButton";
import { getAirportVehicles } from "@/lib/data";
import { VEHICLE_CLASS_LABELS, VEHICLE_TIER_LABELS } from "@/lib/airport-vehicles";
import { formatUSD } from "@/lib/utils";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminVehiclesPage() {
  const vehicles = await getAirportVehicles({ includeDrafts: true });

  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Airport transfers</span>
          <h1>Transfer vehicles</h1>
          <p>Manage budget, standard and luxury options for each vehicle class, including passenger limits and route prices.</p>
        </div>
        <div className="admin-page-head__actions">
          {vehicles.length === 0 && <SeedVehiclesButton />}
          <Link href="/admin/vehicles/new" className="admin-primary-button">+ Add vehicle</Link>
        </div>
      </div>
      <section className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table admin-table--media">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Class</th>
                <th>Tier</th>
                <th>Passengers</th>
                <th>From</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>
                    <div className="table-media">
                      <Image src={vehicle.image} alt="" width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw" unoptimized={vehicle.image.startsWith("http")} />
                      <div>
                        <strong>{vehicle.name}</strong>
                        <small>{vehicle.recommended ? "Best value · " : ""}{vehicle.luggagePieces} bags</small>
                      </div>
                    </div>
                  </td>
                  <td>{VEHICLE_CLASS_LABELS[vehicle.vehicleClass]}</td>
                  <td>{VEHICLE_TIER_LABELS[vehicle.tier]}</td>
                  <td>{vehicle.minPassengers}–{vehicle.maxPassengers}</td>
                  <td>{formatUSD(vehicle.priceFromUSD)}</td>
                  <td>
                    <span className={`admin-status ${vehicle.status === "PUBLISHED" && vehicle.available ? "admin-status--published" : "admin-status--cancelled"}`}>
                      {vehicle.status === "PUBLISHED" && vehicle.available ? "LIVE" : vehicle.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <Link href={`/admin/vehicles/${vehicle.id}/edit`}>Edit</Link>
                      <DeleteButton endpoint={`/api/admin/vehicles/${vehicle.id}`} />
                    </div>
                  </td>
                </tr>
              ))}
              {vehicles.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="table-empty">No transfer vehicles yet. Add a budget taxi, then a standard and luxury option for each class, or load the starter fleet above.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
