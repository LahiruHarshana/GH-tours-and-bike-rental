import Link from "next/link";
import { siteConfig } from "@/config/site";

export function BrandMark({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className={`brand-mark ${dark ? "brand-mark--dark" : ""}`} aria-label={siteConfig.name}>
      <span className="brand-mark__seal" aria-hidden="true">
        <svg viewBox="0 0 64 64" role="img">
          <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M15 41c8-2 12-10 17-24 4 10 9 17 17 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M18 45h28M23 50h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 18c3 5 3 9 0 13-3-4-3-8 0-13Z" fill="currentColor" />
        </svg>
      </span>
      {!compact && (
        <span className="brand-mark__text">
          <strong>GH</strong>
          <small>Tours & Bike Rental</small>
        </span>
      )}
    </Link>
  );
}
