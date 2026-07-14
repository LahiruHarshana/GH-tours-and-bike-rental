import { notFound } from "next/navigation";
import { TourForm } from "@/components/admin/TourForm";
import { getTourById } from "@/lib/data";

export default async function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tour = await getTourById(id);
  if (!tour) notFound();
  return <><div className="admin-page-head"><div><span>Tour packages</span><h1>Edit {tour.title}</h1><p>Update the public package and itinerary.</p></div></div><TourForm tour={tour} /></>;
}
