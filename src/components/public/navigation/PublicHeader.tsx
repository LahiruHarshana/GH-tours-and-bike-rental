"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { navigation, siteConfig } from "@/config/site";
import { BrandMark } from "@/components/public/media/BrandMark";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isInnerPage = pathname !== "/";
  const [condensedState, setCondensedState] = useState(false);
  const condensed = isInnerPage || condensedState;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isInnerPage) return;

    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      setCondensedState(!entry.isIntersecting);
    }, { rootMargin: "0px", threshold: 0 });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isInnerPage]);

  // Mobile nav dialog management
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
  }, [open]);

  // Handle escape key and click outside
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onCancel = (e: Event) => {
      e.preventDefault();
      setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (e.target === dialog) setOpen(false);
    };

    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("click", onClick);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("click", onClick);
    };
  }, []);

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = ""; };
  }, []);

  const headerState = condensed ? "site-header--condensed" : "site-header--over-hero";

  return (
    <header className={cn("site-header", headerState)}>
      <div className="scroll-progress-bar" aria-hidden="true" />
      <div className="container site-header__inner">
        <div className="site-header__brand">
          <BrandMark dark={!condensed} />
          {condensed && pathname === "/" && <span className="chapter-readout" aria-hidden="true" />}
        </div>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={pathname === item.href ? "is-active" : ""}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__actions">
          <a className="header-phone" href={`tel:${siteConfig.phone.replace(/\\s/g, "")}`}>
            <span>24/7 island support</span>
            <strong>{siteConfig.phone}</strong>
          </a>
          <Link className="button button--gold button--small" href="/contact">
            Plan your journey
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav-dialog"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <dialog id="mobile-nav-dialog" ref={dialogRef} className="mobile-nav-dialog" aria-modal="true" aria-label="Mobile Navigation">
        <div className="mobile-nav-dialog__bg" />
        <div className="mobile-nav__header container">
          <BrandMark dark={true} />
          <button
            className="menu-close"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          >
            <span /><span />
          </button>
        </div>
        <div className="container mobile-nav__container">
          <nav className="mobile-nav__links">
            {navigation.map((item, index) => (
              <Link key={item.href} href={item.href} className="mobile-nav__link" style={{ "--stagger": index } as React.CSSProperties} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}>
                <span>0{index + 1}</span>{item.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-nav__footer">
            <a className="button button--gold" href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
