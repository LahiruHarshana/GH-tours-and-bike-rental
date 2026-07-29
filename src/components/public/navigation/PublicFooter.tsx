import Link from "next/link";
import { navigation } from "@/config/site";
import type { SiteContent } from "@/lib/site-content";

export function PublicFooter({ content }: { content: SiteContent["global"] }) {
  return (
    <footer className="site-footer ss-footer">
      <div className="ss-footer__top">
        <p>{content.footerLead}</p>
        <Link href="/" className="ss-header__brand">
          <i aria-hidden="true">GH</i><span>{content.brandName}</span>
        </Link>
        <span>{content.footerTagline}</span>
      </div>

      <div className="ss-footer__links">
        <div>
          <small>Explore</small>
          {navigation.slice(0, 5).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </div>
        <div>
          <small>Find us</small>
          <span>{content.address}</span>
          <a href={`mailto:${content.email}`}>{content.email}</a>
          <a href={`tel:${content.phone.replace(/\s/g, "")}`}>{content.phone}</a>
        </div>
      </div>

      <div className="ss-footer__wordmark" aria-hidden="true">GH TOURS</div>

      <div className="ss-footer__bottom">
        <Link href="/privacy">Privacy Policy</Link>
        <p>© {new Date().getFullYear()} {content.brandName}. Made locally in Sri Lanka.</p>
        <div><Link href="/admin/login">Admin</Link><Link href="/contact">Contact</Link></div>
      </div>
    </footer>
  );
}
