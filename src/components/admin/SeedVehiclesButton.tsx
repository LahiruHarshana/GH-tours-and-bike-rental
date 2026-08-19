"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SeedVehiclesButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function seed() {
    if (!window.confirm("Load the starter airport fleet? Existing vehicles with the same slug are left unchanged.")) return;
    setLoading(true);
    try {
      const response = await fetch("/api/admin/vehicles/seed", { method: "POST" });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.message ?? "Could not load starter fleet.");
      router.refresh();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Could not load starter fleet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="admin-secondary-button" type="button" onClick={seed} disabled={loading}>
      {loading ? "Loading fleet..." : "Load starter fleet"}
    </button>
  );
}
