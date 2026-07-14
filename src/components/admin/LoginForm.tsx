"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "Login failed.");
      router.push("/admin");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-login-form" onSubmit={submit}>
      <label><span>Email address</span><input name="email" type="email" required autoComplete="email" placeholder="admin@ghtours.lk" /></label>
      <label><span>Password</span><input name="password" type="password" required minLength={8} autoComplete="current-password" placeholder="••••••••" /></label>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}
      <button className="admin-primary-button" disabled={loading}>{loading ? "Signing in..." : "Sign in to dashboard"}</button>
    </form>
  );
}
