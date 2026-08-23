import Image from "next/image";
import Link from "next/link";
import { AirportQuickBook } from "@/components/booking/AirportQuickBook";
import { SignatureJourneysReel } from "@/components/public/collections/SignatureJourneysReel";
import { BikeFleetShowcase } from "@/components/public/collections/BikeFleetShowcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBikes, getWebsiteContent } from "@/lib/data";
import {
  absoluteUrl,
  createPageMetadata,
  localBusinessSchema,
} from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = createPageMetadata({
  title: "Sri Lanka Tours, Airport Transfers & Bike Rental",
  description:
    "Private Sri Lanka tours, islandwide CMB airport transfers, and reliable scooter and motorbike rental — planned by a local team.",
  path: "/",
  keywords: [
    "GH Tours Sri Lanka",
    "Sri Lanka tours",
    "Sri Lanka airport transfer",
    "Sri Lanka bike rental",
    "private driver Sri Lanka",
  ],
});

function Multiline({ text }: { text: string }) {
  return text.split("\n").map((line, index) => (
    <span key={`${line}-${index}`}>{index > 0 && <br />}{line}</span>
  ));
}

export default async function HomePage() {
  const [allBikes, content] = await Promise.all([
    getBikes({}),
    getWebsiteContent(),
  ]);
  const home = content.home;
  const bikes = allBikes;

  return (
    <div className="stayscape-home">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": absoluteUrl("/#website"),
              url: absoluteUrl("/"),
              name: "GH Tours & Bike Rental",
              alternateName: "GH Tours Sri Lanka",
              inLanguage: "en-LK",
            },
            localBusinessSchema(),
          ],
        }}
      />
      <div id="hero-sentinel" className="stayscape-sentinel" />

      <section className="ss-hero" aria-labelledby="ss-hero-title">
        <h1 id="ss-hero-title"><Multiline text={home.heroTitle} /></h1>

        <div
          className="ss-hero__visual"
          data-scroll-motion
          data-cinema-parallax="true"
          data-cursor-depth
        >
          <Image
            src={home.heroImage}
            alt={home.heroImageAlt}
            fill
            priority
            sizes="(max-width: 700px) 100vw, 96vw"
            unoptimized={home.heroImage.startsWith("http")}
          />
          <div className="ss-hero__caption">
            <span>7.8731° N</span>
            <strong>{home.heroCaption}</strong>
            <span>80.7718° E</span>
          </div>
          <span className="ss-hero__depth-label ss-hero__depth-label--one" aria-hidden="true">INDIAN OCEAN</span>
          <span className="ss-hero__depth-label ss-hero__depth-label--two" aria-hidden="true">SOUTH / 05°58′N</span>
        </div>

        <div className="ss-planner" aria-label="Journey planner">
          <Link href="/tours" className="ss-planner__item">
            <small>Journey</small>
            <strong>Private Sri Lanka tours</strong>
          </Link>
          <Link href="#quick-airport-booking" className="ss-planner__item">
            <small>Arrival</small>
            <strong>Book airport hire</strong>
          </Link>
          <Link href="/bikes" className="ss-planner__item">
            <small>Ride</small>
            <strong>Motorbike rental</strong>
          </Link>
          <Link href="/contact" className="ss-round-arrow" aria-label="Design my journey">↗</Link>
        </div>

        <div className="ss-hero__promise">
          <p>{home.heroPromise}</p>
          <ul aria-label="Journey assurances">
            {home.assurances.map((assurance) => <li key={assurance}>{assurance}</li>)}
          </ul>
        </div>
      </section>

      <section
        id="quick-airport-booking"
        className="ss-airport-booking"
        aria-labelledby="ss-airport-chapter-title"
      >
        <header className="ss-airport-booking__intro">
          <p className="ss-section-kicker">Arrivals</p>
          <h2 id="ss-airport-chapter-title">Land soft.<br />Start south.</h2>
          <p>
            Private CMB transfers islandwide — flight tracked, fixed fare,
            driver waiting. Book in minutes, confirm on WhatsApp.
          </p>
          <Link href="/airport-hire">Full airport hire details ↗</Link>
        </header>
        <AirportQuickBook />
      </section>

      <section className="ss-experiences ss-journeys" aria-labelledby="ss-experiences-title">
        <header className="ss-journeys__intro ss-journeys__intro--cinema" data-scroll-motion>
          <p className="ss-section-kicker">{home.experiencesEyebrow}</p>
          <h2 id="ss-experiences-title"><Multiline text={home.experiencesTitle} /></h2>
          <p className="ss-section-copy">{home.experiencesCopy}</p>
          <div className="ss-journeys__actions">
            <Link href="/custom-tour" className="ss-journeys__cta">
              Design my custom journey
              <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/tours" className="ss-journeys__secondary">
              Browse ready-made tours ↗
            </Link>
          </div>
          <div className="ss-journeys__intro-foot">
            <p className="ss-journeys__scroll-hint">Scroll to explore seven destinations ↓</p>
          </div>
        </header>

        <SignatureJourneysReel />
      </section>

      <section className="ss-dark ss-ride" aria-labelledby="ss-dark-title">
        <div className="ss-dark__intro">
          <p className="ss-section-kicker ss-section-kicker--light">{home.bikeEyebrow}</p>
          <h2 id="ss-dark-title"><Multiline text={home.bikeTitle} /></h2>
          <p className="ss-catalogue-count ss-catalogue-count--dark">
            Explore Sri Lanka on your own rhythm — {bikes.length} bikes ready, with
            a clear handover.{" "}
            <Link href="/bikes">browse the full fleet ↗</Link>
          </p>
          <nav className="ss-ride__links" aria-label="Ride and arrival">
            <Link href="/bikes">Bike rental</Link>
            <Link href="/airport-hire">Airport transfer</Link>
          </nav>
          <p className="ss-ride__scroll-hint">Scroll to browse the fleet ↓</p>
        </div>

        <BikeFleetShowcase bikes={bikes} />

        <div className="ss-ride__supporting">
          <Link href="/airport-hire" className="ss-orange-card ss-ride__airport" data-cursor-depth>
            <span>
              <strong><Multiline text={home.airportCardTitle} /></strong>
              <small>{home.airportCardCopy}</small>
            </span>
            <i className="ss-round-arrow">↗</i>
            <span className="ss-service-tags">Flight tracked · Fixed fare · Meet &amp; greet</span>
          </Link>

          <div className="ss-proof-card ss-proof-card--ride" data-cursor-depth>
            <div className="ss-proof-card__intro">
              <strong><Multiline text={home.proofTitle} /></strong>
              <p>{home.proofCopy}</p>
            </div>
            <div className="ss-proof-card__stats">
              {home.guestStats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <small>{stat.detail}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        <blockquote className="ss-quote">
          “{home.testimonial}”
          <footer>{home.testimonialByline}</footer>
        </blockquote>
      </section>

      <section
        className="ss-odyssey"
        aria-labelledby="ss-odyssey-title"
        data-scroll-motion
        data-range="sticky"
      >
        <div className="ss-odyssey__sticky">
          <header className="ss-odyssey__intro">
            <p>Scroll the island</p>
            <h2 id="ss-odyssey-title">One road.<br /><em>Three worlds.</em></h2>
            <span>Keep moving ↓</span>
          </header>

          <div className="ss-odyssey__stage">
            <article className="ss-odyssey__scene ss-odyssey__scene--one">
              <Image
                src="/images/sigiriya.webp"
                alt="Sigiriya rock fortress above Sri Lanka's central plains"
                fill
                sizes="(max-width: 760px) 84vw, 52vw"
              />
              <div>
                <span>01 · Cultural triangle</span>
                <h3>Ancient<br />heights</h3>
                <small>Sigiriya · 3 days</small>
              </div>
            </article>

            <article className="ss-odyssey__scene ss-odyssey__scene--two">
              <Image
                src="/images/train-hills.webp"
                alt="Train winding through Sri Lanka's misty hill country"
                fill
                sizes="(max-width: 760px) 84vw, 52vw"
              />
              <div>
                <span>02 · Hill country</span>
                <h3>Mist &amp;<br />motion</h3>
                <small>Ella · 2 days</small>
              </div>
            </article>

            <article className="ss-odyssey__scene ss-odyssey__scene--three">
              <Image
                src="/images/south-coast.webp"
                alt="Palm-fringed beach on Sri Lanka's south coast"
                fill
                sizes="(max-width: 760px) 84vw, 52vw"
              />
              <div>
                <span>03 · Deep south</span>
                <h3>Ocean<br />light</h3>
                <small>South coast · stay awhile</small>
              </div>
            </article>
          </div>

          <div className="ss-odyssey__meter" aria-hidden="true">
            <span><i /></span>
            <small>COAST TO KINGDOM</small>
          </div>
        </div>
      </section>

      <section className="ss-local-intro" aria-labelledby="ss-local-title">
        <div>
          <p className="ss-section-kicker">Island-wide Sri Lanka travel</p>
          <h2 id="ss-local-title">One local team.<br />Your whole Sri Lanka journey.</h2>
        </div>
        <div className="ss-local-intro__copy">
          <p>
            GH Tours &amp; Bike Rental helps travellers explore Sri Lanka from
            arrival to departure. Arrange a private transfer from Bandaranaike
            International Airport to any destination, rent a reliable bike for
            coastal or inland rides, or build a custom private tour across the
            island with one team handling the details.
          </p>
          <nav aria-label="Travel services">
            <Link href="/tours">Design a custom tour</Link>
            <Link href="/airport-hire">Book an airport transfer</Link>
            <Link href="/bikes">Browse the bike fleet</Link>
          </nav>
        </div>
      </section>

      <section className="ss-story" aria-labelledby="ss-story-title">
        <p className="ss-section-kicker">{home.storyEyebrow}</p>
        <h2 id="ss-story-title">{home.storyTitle}</h2>

        <div className="ss-story__portrait" data-scroll-motion data-cinema-parallax="true" data-cursor-depth>
          <Image src={home.storyImage} alt={home.storyImageAlt} fill sizes="(max-width: 700px) 72vw, 28vw" unoptimized={home.storyImage.startsWith("http")} />
          <div className="ss-story__overlay">
            {home.storyMovements.map((movement) => <span key={movement}>{movement}</span>)}
          </div>
        </div>

        <div className="ss-story__side ss-story__side--left">
          <Link href="/about">Our story</Link>
        </div>
        <div className="ss-story__side ss-story__side--right">
          <Link href="/contact">Contact</Link>
        </div>

        <div className="ss-final-cta">
          <p>{home.finalEyebrow}</p>
          <h2><Multiline text={home.finalTitle} /><br /><em>{home.finalAccent}</em> next.</h2>
          <span className="ss-final-cta__arrow">↗</span>
          <div className="ss-final-cta__copy">
            <p>{home.finalCopy}</p>
            <div>
              <Link href="/contact">Plan a custom journey</Link>
              <a href={`https://wa.me/${content.global.whatsapp}`} target="_blank" rel="noreferrer">Chat on WhatsApp ↗</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
