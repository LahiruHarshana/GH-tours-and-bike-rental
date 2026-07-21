import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getBikes } from "@/lib/data";
import { formatUSD } from "@/lib/utils";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminBikesPage() {
  const bikes = await getBikes({ includeDrafts: true });
  return (
    <><div className="admin-page-head"><div><span>Fleet management</span><h1>Bike fleet</h1><p>Control bike details, daily rates, stock and public availability.</p></div><Link href="/admin/bikes/new" className="admin-primary-button">+ Add bike</Link></div><section className="admin-card"><div className="admin-table-wrap"><table className="admin-table admin-table--media"><thead><tr><th>Bike</th><th>Category</th><th>Daily rate</th><th>Quantity</th><th>Availability</th><th>Actions</th></tr></thead><tbody>{bikes.map((bike) => <tr key={bike.id}><td><div className="table-media"><Image src={bike.image} alt=""  width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw"/><div><strong>{bike.name}</strong><small>{bike.engineCC} CC · {bike.transmission}</small></div></div></td><td>{bike.category}</td><td>{formatUSD(bike.dailyRateUSD)}</td><td>{bike.quantity}</td><td><span className={`admin-status ${bike.available ? "admin-status--published" : "admin-status--cancelled"}`}>{bike.available ? "AVAILABLE" : "PAUSED"}</span></td><td><div className="table-actions"><Link href={`/admin/bikes/${bike.id}/edit`}>Edit</Link><DeleteButton endpoint={`/api/admin/bikes/${bike.id}`} /></div></td></tr>)}{bikes.length === 0 && <tr><td colSpan={6}><div className="table-empty">No bikes in the fleet yet.</div></td></tr>}</tbody></table></div></section></>
  );
}
