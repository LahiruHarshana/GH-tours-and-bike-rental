"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({ endpoint, label = "Delete" }: { endpoint: string; label?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function remove() {
    if (!window.confirm("Delete this item permanently? This action cannot be undone.")) return;
    setLoading(true);
    const response = await fetch(endpoint, { method: "DELETE" });
    setLoading(false);
    if (!response.ok) {
      const result = await response.json().catch(() => null);
      window.alert(result?.message ?? "Could not delete item.");
      return;
    }
    router.refresh();
  }

  return <button className="admin-text-button admin-text-button--danger" onClick={remove} disabled={loading}>{loading ? "Deleting..." : label}</button>;
}
