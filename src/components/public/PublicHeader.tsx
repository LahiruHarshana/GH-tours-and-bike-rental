"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, siteConfig } from "@/config/site";
import { BrandMark } from "@/components/ui/BrandMark";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);


  return (
    <header className={cn("site-header", scrolled && "site-header--scrolled", open && "site-header--open")}>
      <div className="container site-header__inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "is-active" : ""} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__actions">
          <a className="header-phone" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
            <span>24/7 island support</span>
            <strong>{siteConfig.phone}</strong>
          </a>
          <Link className="button button--gold button--small" href="/contact">
            Plan your journey
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>
      </div>
      <div className="mobile-nav">
        <div className="container">
          {navigation.map((item, index) => (
            <Link key={item.href} href={item.href} style={{ transitionDelay: `${index * 45}ms` }} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>{item.label}
            </Link>
          ))}
          <a className="button button--gold" href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
