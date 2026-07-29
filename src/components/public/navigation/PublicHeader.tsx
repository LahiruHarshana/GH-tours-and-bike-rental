"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, siteConfig } from "@/config/site";

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      document.body.style.overflow = "hidden";
      if (!dialog.open) dialog.showModal();
    } else {
      document.body.style.overflow = "";
      if (dialog.open) dialog.close();
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`site-header ss-header ${pathname === "/" ? "ss-header--home" : "ss-header--inner"}`}>
      <div className="ss-header__inner">
        <button className="ss-header__pill ss-header__menu" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-nav-dialog" aria-label="Open navigation menu">
          <span aria-hidden="true">••</span><b>Menu</b>
        </button>

        <Link href="/" className="ss-header__brand" aria-label={siteConfig.name}>
          <i aria-hidden="true">GH</i>
          <span>GH Tours</span>
        </Link>

        <nav className="ss-header__desktop-nav" aria-label="Main navigation">
          {navigation.slice(1, 5).map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="ss-header__pill ss-header__cta" href="/contact">Plan your journey</Link>
      </div>

      <dialog
        id="mobile-nav-dialog"
        ref={dialogRef}
        className="ss-menu-dialog"
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
      >
        <div className="ss-menu-dialog__panel">
          <div className="ss-menu-dialog__top">
            <Link href="/" className="ss-header__brand" onClick={() => setOpen(false)} aria-label={siteConfig.name}>
              <i aria-hidden="true">GH</i><span>GH Tours</span>
            </Link>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation menu">Close</button>
          </div>
          <nav aria-label="Main navigation">
            {navigation.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}>
                <span>0{index + 1}</span>{item.label}<b aria-hidden="true">↗</b>
              </Link>
            ))}
          </nav>
          <div className="ss-menu-dialog__foot">
            <p>{siteConfig.description}</p>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">Chat on WhatsApp ↗</a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
