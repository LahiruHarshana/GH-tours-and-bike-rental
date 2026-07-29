import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getTours } from "@/lib/data";
import { formatUSD } from "@/lib/utils";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminToursPage() {
  const tours = await getTours({ includeDrafts: true });
  return (
    <>
      <div className="admin-page-head"><div><span>Content management</span><h1>Tour packages</h1><p>Create, publish and maintain standard Sri Lanka journeys.</p></div><Link href="/admin/tours/new" className="admin-primary-button">+ New tour</Link></div>
      <section className="admin-card"><div className="admin-table-wrap"><table className="admin-table admin-table--media"><thead><tr><th>Tour</th><th>Duration</th><th>Starting price</th><th>Featured</th><th>Status</th><th>Actions</th></tr></thead><tbody>{tours.map((tour) => <tr key={tour.id}><td><div className="table-media"><Image src={tour.image} alt=""  width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw" unoptimized={tour.image.startsWith("http")}/><div><strong>{tour.title}</strong><small>{tour.location}</small></div></div></td><td>{tour.durationDays} days</td><td>{formatUSD(tour.priceFrom)}</td><td>{tour.featured ? "Yes" : "—"}</td><td><span className={`admin-status admin-status--${tour.status.toLowerCase()}`}>{tour.status}</span></td><td><div className="table-actions"><Link href={`/admin/tours/${tour.id}/edit`}>Edit</Link><a href={`/tours/${tour.slug}`} target="_blank" rel="noreferrer">Preview</a><DeleteButton endpoint={`/api/admin/tours/${tour.id}`} /></div></td></tr>)}{tours.length === 0 && <tr><td colSpan={6}><div className="table-empty">No tour packages yet.</div></td></tr>}</tbody></table></div></section>
    </>
  );
}
