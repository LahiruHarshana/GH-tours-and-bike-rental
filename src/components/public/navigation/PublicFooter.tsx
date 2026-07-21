import Link from "next/link";
import { BrandMark } from "@/components/public/media/BrandMark";
import { navigation, siteConfig } from "@/config/site";

export function PublicFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-orbit" aria-hidden="true"><span>GH · SRI LANKA · MADE LOCALLY ·</span></div>
      <div className="container footer-intro">
        <p>Until the next road.</p>
        <span>Independent journeys across Sri Lanka</span>
      </div>
      <div className="container footer-farewell">
        <span lang="si">යළි හමුවෙමු</span>
        <small>Until we meet again</small>
      </div>
      <div className="container footer-grid">
        <div className="footer-brand footer-column" data-scroll-3d="tilt-reveal" data-range="enter" style={{ "--i": 0 } as React.CSSProperties}>
          <BrandMark dark />
          <p>{siteConfig.description}</p>
          <a className="footer-whatsapp" href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">
            <span>WhatsApp concierge <b aria-hidden="true">↗</b></span>
            <strong>{siteConfig.phone}</strong>
          </a>
        </div>
        <div className="footer-column" data-scroll-3d="tilt-reveal" data-range="enter" style={{ "--i": 1 } as React.CSSProperties}>
          <h3><span>01</span> Explore</h3>
          <div className="footer-links">
            {navigation.slice(0, 5).map((item) => <Link key={item.href} href={item.href}><span>{item.label}</span><b aria-hidden="true">↗</b></Link>)}
          </div>
        </div>
        <div className="footer-column" data-scroll-3d="tilt-reveal" data-range="enter" style={{ "--i": 2 } as React.CSSProperties}>
          <h3><span>02</span> Book</h3>
          <div className="footer-links">
            <Link href="/airport-hire"><span>Airport transfer</span><b aria-hidden="true">↗</b></Link>
            <Link href="/tours"><span>Private tours</span><b aria-hidden="true">↗</b></Link>
            <Link href="/bikes"><span>Motorbike rental</span><b aria-hidden="true">↗</b></Link>
            <Link href="/contact"><span>Custom itinerary</span><b aria-hidden="true">↗</b></Link>
          </div>
        </div>
        <div className="footer-column" data-scroll-3d="tilt-reveal" data-range="enter" style={{ "--i": 3 } as React.CSSProperties}>
          <h3><span>03</span> Find us</h3>
          <address>
            {siteConfig.address}<br />
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><br />
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
          </address>
        </div>
      </div>
      <div className="container footer-wordmark" aria-hidden="true"><span>GH</span><strong>TOURS</strong></div>
      <div className="footer-route" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {siteConfig.name}. Made locally in Sri Lanka.</p>
        <div><Link href="/privacy">Privacy</Link><Link href="/admin/login">Admin</Link></div>
      </div>
    </footer>
  );
}
