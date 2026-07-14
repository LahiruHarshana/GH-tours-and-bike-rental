import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { TourCard } from "@/components/public/TourCard";
import { BikeCard } from "@/components/public/BikeCard";
import { HeroShowcase } from "@/components/public/HeroShowcase";
import { IslandStoryReel } from "@/components/public/IslandStoryReel";
import { JourneyPlannerRibbon } from "@/components/public/JourneyPlannerRibbon";
import { IslandRoute } from "@/components/public/IslandRoute";
import { CinematicHeading } from "@/components/ui/CinematicHeading";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { EditorialRail } from "@/components/ui/EditorialRail";
import { getBikes, getTours } from "@/lib/data";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [tours, bikes] = await Promise.all([
    getTours({ featured: true, limit: 12 }),
    getBikes({ limit: 12 }),
  ]);

  return (
    <>
      <HeroShowcase />
      <JourneyPlannerRibbon />

      <section className="section intro-section modern-section">
        <div className="container intro-grid">
          <Reveal direction="left" className="intro-heading-reveal">
            <div className="section-heading intro-heading">
              <span className="eyebrow"><i />One small island · endless change</span>
              <CinematicHeading lines={["One small island.", "A thousand", "different journeys."]} />
              <p>From the first airport welcome to the last coastal sunset, the essential details are handled by a real local team.</p>
            </div>
          </Reveal>
          <Reveal delay={140} direction="right">
            <div className="intro-copy">
              <span className="intro-copy__marker" aria-hidden="true" />
              <p className="dropcap">Sri Lanka is small on the map, but every road changes the story. Ancient stone cities become tea-covered mountains, then wild parks, fishing villages and warm Indian Ocean shores.</p>
              <div className="signature-line"><span>ආයුබෝවන්</span><small>May you live long</small></div>
            </div>
          </Reveal>
        </div>
      </section>

      <IslandStoryReel />

      <section className="section section--sand featured-tours modern-section">
        <div className="container section-topline">
          <Reveal>
            <div className="section-heading journeys-heading">
              <span className="eyebrow"><i />Signature journeys</span>
              <CinematicHeading lines={["Sri Lanka,", "thoughtfully arranged."]} />
              <p>Start with one of our most-loved routes. Every itinerary can be adjusted around your arrival, pace and interests.</p>
            </div>
          </Reveal>
          <Link className="text-link text-link--dark editorial-link" href="/tours"><span>View all tours</span><b aria-hidden="true">↗</b></Link>
        </div>
        <div className="container collection-shell">
          <EditorialRail label="Signature journey collection" variant="journeys">
            {tours.map((tour, index) => (
              <Reveal key={tour.id} delay={(index % 4) * 90} direction="scale">
                <TourCard tour={tour} index={index} />
              </Reveal>
            ))}
          </EditorialRail>
        </div>
      </section>

      <IslandRoute />

      <section className="section airport-story modern-section">
        <div className="container airport-story__grid">
          <Reveal direction="left" className="airport-story__visual scroll-image">
            <div className="airport-visual-stage" data-scroll-motion>
              <span className="airport-sun" aria-hidden="true" />
              <span className="airport-route airport-route--one" aria-hidden="true" />
              <span className="airport-route airport-route--two" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/south-coast.jpg" alt="A calm coastal road view after arriving in Sri Lanka" loading="lazy" decoding="async" />
            </div>
            <div className="airport-stamp" data-scroll-motion><small>Bandaranaike International</small><strong>CMB</strong><span>We track your flight</span></div>
          </Reveal>
          <Reveal delay={120} direction="right" className="airport-story__content">
            <div className="section-heading airport-heading">
              <span className="eyebrow"><i />Your first good decision</span>
              <CinematicHeading lines={["From arrivals hall", "to island calm."]} />
              <p>Your driver waits with your name, helps with luggage and takes the best route—whether you are heading to Colombo, Galle, Kandy, Ella or beyond.</p>
            </div>
            <div className="check-grid">
              <span><i>01</i> Flight delay monitoring</span><span><i>02</i> Fixed quotation before arrival</span><span><i>03</i> Cars, vans & minibuses</span><span><i>04</i> Child seats on request</span>
            </div>
            <MagneticLink className="button button--dark" href="#book-airport">Arrange my transfer <span aria-hidden="true">↑</span></MagneticLink>
          </Reveal>
        </div>
      </section>

      <section className="section bike-showcase modern-section">
        <div className="container bike-layout">
          <div className="bike-intro">
            <Reveal>
              <div className="section-heading bike-heading">
                <span className="eyebrow"><i />Freedom on two wheels</span>
                <CinematicHeading lines={["Choose the ride.", "Follow the coast."]} />
                <p>Well-maintained bikes, transparent daily rates and local assistance from pickup to return.</p>
              </div>
            </Reveal>
            <Link className="text-link text-link--dark editorial-link" href="/bikes"><span>See full fleet</span><b aria-hidden="true">↗</b></Link>
          </div>
          <div className="bike-collection">
            <EditorialRail label="Motorbike rental collection" variant="bikes">
              {bikes.map((bike, index) => (
                <Reveal key={bike.id} delay={(index % 4) * 90} direction="scale">
                  <BikeCard bike={bike} index={index} />
                </Reveal>
              ))}
            </EditorialRail>
          </div>
        </div>
      </section>

      <section className="section guest-stories modern-section">
        <div className="container guest-stories__grid">
          <Reveal direction="left" className="guest-stories__image scroll-image">
            <figure data-scroll-motion>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/sigiriya.jpg" alt="Sigiriya rock fortress surrounded by green forest" loading="lazy" decoding="async" />
              <figcaption>Sigiriya · Cultural Triangle</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={100} direction="right" className="guest-stories__copy">
            <span className="eyebrow"><i />Notes from the road</span>
            <blockquote>“It felt less like following a tour and more like travelling with someone who genuinely wanted us to love the island.”</blockquote>
            <div className="guest-stories__author"><strong>Maya & Daniel</strong><span>United Kingdom · Coast to tea country</span></div>
            <div className="guest-stories__stats"><span><strong>4.9/5</strong>Guest rating</span><span><strong>15–30 min</strong>Typical reply</span><span><strong>100%</strong>Private journeys</span></div>
          </Reveal>
        </div>
      </section>

      <section className="section values-section modern-section">
        <div className="container values-grid">
          <Reveal direction="left"><div className="values-quote" data-scroll-motion><span>“</span><blockquote>The best journeys leave room for the unexpected.</blockquote><p><i />We plan the essentials and keep the day human.</p></div></Reveal>
          <div className="values-list">
            <Reveal delay={60}><article><span>01</span><div><h3>Local, not scripted</h3><p>Meet a team that knows the roads, seasons and small details that maps cannot tell you.</p></div><b aria-hidden="true">Local knowledge</b></article></Reveal>
            <Reveal delay={120}><article><span>02</span><div><h3>Clear, honest pricing</h3><p>Receive a confirmed quotation before you travel. No surprise stops or hidden commissions.</p></div><b aria-hidden="true">No surprises</b></article></Reveal>
            <Reveal delay={180}><article><span>03</span><div><h3>Support that answers</h3><p>WhatsApp assistance from a real person before, during and after your booking.</p></div><b aria-hidden="true">Real people</b></article></Reveal>
          </div>
        </div>
      </section>

      <section className="cta-section modern-cta">
        <div className="container cta-section__inner">
          <Reveal>
            <span className="eyebrow eyebrow--light"><i />Your island story starts here</span>
            <CinematicHeading lines={["Tell us where you want", "to wake up next."]} />
            <p>Share your dates, interests and travel style. We will shape a route that feels unmistakably yours.</p>
            <div><MagneticLink className="button button--gold" href="/contact">Plan a custom journey <span aria-hidden="true">↗</span></MagneticLink><a className="text-link" href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer"><span>Chat on WhatsApp</span> ↗</a></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
