import { notFound } from "next/navigation";
import { BikeForm } from "@/components/admin/BikeForm";
import { getBikeById } from "@/lib/data";

export default async function EditBikePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bike = await getBikeById(id);
  if (!bike) notFound();
  return <><div className="admin-page-head"><div><span>Bike fleet</span><h1>Edit {bike.name}</h1><p>Update pricing, stock and availability.</p></div></div><BikeForm bike={bike} /></>;
}
