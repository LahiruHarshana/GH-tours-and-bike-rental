import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function BrandMark({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className={`brand-mark ${dark ? "brand-mark--dark" : ""}`} aria-label={siteConfig.name}>
      <span className="brand-mark__seal" aria-hidden="true">
        <Image
          src="/images/gh-tours-logo.png"
          alt=""
          width={1001}
          height={728}
          sizes="64px"
        />
      </span>
      {!compact && (
        <span className="brand-mark__text">
          <strong>GH Tours</strong>
          <small>Tours & Bike Rental</small>
        </span>
      )}
    </Link>
  );
}
