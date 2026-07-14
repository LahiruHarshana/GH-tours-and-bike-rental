import { BookingManager } from "@/components/admin/BookingManager";
import { getBookings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await getBookings();
  return <><div className="admin-page-head"><div><span>Guest operations</span><h1>Bookings</h1><p>Accept requests, confirm prices, update payments and move each journey through its workflow.</p></div></div><BookingManager bookings={bookings} /></>;
}
