"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/components/ui/BrandMark";

const links = [
  { href: "/admin", label: "Overview", icon: "⌘" },
  { href: "/admin/bookings", label: "Bookings", icon: "▦" },
  { href: "/admin/tours", label: "Tour packages", icon: "◆" },
  { href: "/admin/bikes", label: "Bike fleet", icon: "◉" },
];

export function AdminShell({ children, user }: { children: React.ReactNode; user: { name: string; email: string; role: string } }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${menuOpen ? "is-open" : ""}`}>
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
          <button onClick={logout}><span>⇥</span>Sign out</button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-menu-button" onClick={() => setMenuOpen((value) => !value)}>☰</button>
          <div><span>GH Command Center</span><small>Bookings, fleet and island operations</small></div>
          <div className="admin-user"><span>{user.name.charAt(0).toUpperCase()}</span><div><strong>{user.name}</strong><small>{user.role}</small></div></div>
        </header>
        <div className="admin-content">{children}</div>
      </div>
      {menuOpen && <button className="admin-overlay" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
    </div>
  );
}
