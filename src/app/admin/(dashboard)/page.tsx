import Link from "next/link";
import { getBookings, getDashboardStats } from "@/lib/data";
import { formatDate, formatUSD } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, bookings] = await Promise.all([getDashboardStats(), getBookings()]);
  return (
    <>
      <div className="admin-page-head"><div><span>Operations overview</span><h1>Good day, team.</h1><p>Here is what needs attention across GH Tours today.</p></div><Link href="/admin/bookings" className="admin-primary-button">Open bookings</Link></div>
      <div className="stat-grid">
        <article><span>All requests</span><strong>{stats.totalBookings}</strong><small>Total booking enquiries</small><i>◫</i></article>
        <article><span>Needs action</span><strong>{stats.pendingBookings}</strong><small>Pending confirmation</small><i>!</i></article>
        <article><span>Live tours</span><strong>{stats.publishedTours}</strong><small>Published packages</small><i>◇</i></article>
        <article><span>Fleet ready</span><strong>{stats.availableBikes}</strong><small>Available bike models</small><i>◎</i></article>
      </div>
      <div className="admin-dashboard-grid">
        <section className="admin-card">
          <div className="admin-card__head"><div><h2>Recent booking requests</h2><p>Newest enquiries from the public website.</p></div><Link href="/admin/bookings">View all →</Link></div>
          <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Reference</th><th>Guest</th><th>Service</th><th>Travel date</th><th>Status</th></tr></thead><tbody>{bookings.slice(0, 7).map((booking) => <tr key={booking.id}><td><strong>{booking.bookingCode}</strong></td><td>{booking.customerName}<small>{booking.email}</small></td><td>{booking.type}<small>{booking.sourceTitle}</small></td><td>{formatDate(booking.travelDate)}</td><td><span className={`admin-status admin-status--${booking.status.toLowerCase()}`}>{booking.status.replace("_", " ")}</span></td></tr>)}{bookings.length === 0 && <tr><td colSpan={5}><div className="table-empty">No bookings yet. Submit a public booking after configuring MongoDB.</div></td></tr>}</tbody></table></div>
        </section>
        <aside className="admin-card admin-revenue-card"><div className="admin-card__head"><div><h2>Confirmed revenue</h2><p>Paid bookings recorded in USD.</p></div></div><div className="revenue-total"><span>This workspace</span><strong>{formatUSD(stats.revenue)}</strong></div><div className="quick-actions"><p>Quick actions</p><Link href="/admin/tours/new"><span>＋</span><div><strong>Create tour package</strong><small>Publish a new itinerary</small></div></Link><Link href="/admin/vehicles/new"><span>＋</span><div><strong>Add transfer vehicle</strong><small>Budget, standard or luxury</small></div></Link><Link href="/admin/bikes/new"><span>＋</span><div><strong>Add bike to fleet</strong><small>Set pricing and availability</small></div></Link><Link href="/admin/bookings"><span>→</span><div><strong>Review pending requests</strong><small>{stats.pendingBookings} need attention</small></div></Link></div></aside>
      </div>
    </>
  );
}
