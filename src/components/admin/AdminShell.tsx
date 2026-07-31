"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/public/media/BrandMark";

const links = [
  { href: "/admin", label: "Overview", icon: "01" },
  { href: "/admin/bookings", label: "Bookings", icon: "02" },
  { href: "/admin/content", label: "Website content", icon: "03" },
  { href: "/admin/tours", label: "Tour packages", icon: "04" },
  { href: "/admin/bikes", label: "Bike fleet", icon: "05" },
];

export function AdminShell({ children, user }: { children: React.ReactNode; user: { name: string; email: string; role: string } }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function logout() {
    setSigningOut(true);
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) throw new Error();
      router.push("/admin/login");
      router.refresh();
    } catch {
      setSigningOut(false);
      window.alert("Could not sign out. Please try again.");
    }
  }

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <div className="admin-shell">
      <aside id="admin-navigation" className={`admin-sidebar ${menuOpen ? "is-open" : ""}`} aria-label="Admin navigation">
        <div className="admin-sidebar__brand"><BrandMark dark /></div>
        <nav>
          <p>Workspace</p>
          {links.map((link) => {
            const active = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);
            return <Link key={link.href} href={link.href} className={active ? "is-active" : ""} onClick={() => setMenuOpen(false)}><span>{link.icon}</span>{link.label}</Link>;
          })}
        </nav>
        <div className="admin-sidebar__bottom">
          <a href="/" target="_blank" rel="noreferrer"><span>↗</span>View website</a>
          <button onClick={logout} disabled={signingOut}><span>⇥</span>{signingOut ? "Signing out..." : "Sign out"}</button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-button"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="admin-navigation"
            aria-label={menuOpen ? "Close admin navigation" : "Open admin navigation"}
          >
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          </button>
          <div><span>GH Operations</span><small>Journeys, bookings and fleet</small></div>
          <div className="admin-user"><span>{user.name.charAt(0).toUpperCase()}</span><div><strong>{user.name}</strong><small>{user.role}</small></div></div>
        </header>
        <div className="admin-content">{children}</div>
      </div>
      {menuOpen && <button className="admin-overlay" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
    </div>
  );
}
