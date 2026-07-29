import Link from "next/link";
import { navigation, siteConfig } from "@/config/site";

export function PublicFooter() {
  return (
    <footer className="site-footer ss-footer">
      <div className="ss-footer__top">
        <p>Until the next road.</p>
        <Link href="/" className="ss-header__brand">
          <i aria-hidden="true">GH</i><span>GH Tours</span>
        </Link>
        <span>Independent journeys across Sri Lanka</span>
      </div>

      <div className="ss-footer__links">
        <div>
          <small>Explore</small>
          {navigation.slice(0, 5).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </div>
        <div>
          <small>Find us</small>
          <span>{siteConfig.address}</span>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
        </div>
      </div>

      <div className="ss-footer__wordmark" aria-hidden="true">GH TOURS</div>

      <div className="ss-footer__bottom">
        <Link href="/privacy">Privacy Policy</Link>
        <p>© {new Date().getFullYear()} {siteConfig.name}. Made locally in Sri Lanka.</p>
        <div><Link href="/admin/login">Admin</Link><Link href="/contact">Contact</Link></div>
      </div>
    </footer>
  );
}
