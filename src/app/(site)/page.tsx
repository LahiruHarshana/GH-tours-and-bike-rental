import Image from "next/image";
import Link from "next/link";
import { AirportQuickBook } from "@/components/booking/AirportQuickBook";
import { getBikes, getTours, getWebsiteContent } from "@/lib/data";
import { formatUSD } from "@/lib/utils";

export const dynamic = "force-dynamic";

function Multiline({ text }: { text: string }) {
  return text.split("\n").map((line, index) => (
    <span key={`${line}-${index}`}>{index > 0 && <br />}{line}</span>
  ));
}

export default async function HomePage() {
  const [tours, bikes, content] = await Promise.all([
    getTours({ featured: true, limit: 3 }),
    getBikes({ limit: 3 }),
    getWebsiteContent(),
  ]);
  const home = content.home;

  return (
    <div className="stayscape-home">
      <div id="hero-sentinel" className="stayscape-sentinel" />

      <section className="ss-hero" aria-labelledby="ss-hero-title">
        <p className="ss-hero__eyebrow">{home.heroEyebrow}</p>
        <h1 id="ss-hero-title"><Multiline text={home.heroTitle} /></h1>

        <div className="ss-hero__visual">
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
        aria-label="Quick airport transfer booking"
      >
        <AirportQuickBook />
      </section>

      <section className="ss-experiences" aria-labelledby="ss-experiences-title">
        <p className="ss-section-kicker">{home.experiencesEyebrow}</p>
        <h2 id="ss-experiences-title"><Multiline text={home.experiencesTitle} /></h2>
        <p className="ss-section-copy">{home.experiencesCopy}</p>

        <nav className="ss-pills" aria-label="Explore our services">
          <Link href="/tours" className="is-active">Tours</Link>
          <Link href="/airport-hire">Airport hire</Link>
          <Link href="/bikes">Bike rental</Link>
          <Link href="/contact">Custom journey</Link>
        </nav>

        <div className="ss-card-grid">
          {tours.map((tour) => (
            <Link href={`/tours/${tour.slug}`} className="ss-product-card" key={tour.id}>
              <span className="ss-product-card__image">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 760px) 88vw, 25vw"
                  unoptimized={tour.image.startsWith("http")}
                />
              </span>
              <span className="ss-product-card__body">
                <strong>{tour.title}</strong>
                <small>{tour.location}</small>
                <span className="ss-product-card__meta">
                  <em>{tour.durationDays} days</em>
                  <b>{formatUSD(tour.priceFrom)}</b>
                </span>
              </span>
            </Link>
          ))}

          <Link href="/tours" className="ss-orange-card">
            <span>
              <strong>Signature<br />journeys</strong>
              <small>Private · Flexible · Local</small>
            </span>
            <i className="ss-round-arrow">↗</i>
          </Link>
        </div>

        <section className="ss-journey-chooser" aria-labelledby="ss-journey-chooser-title">
          <header className="ss-journey-chooser__intro">
          <span>{home.chooserEyebrow}</span>
          <div>
              <h3 id="ss-journey-chooser-title"><Multiline text={home.chooserTitle} /></h3>
              <p>{home.chooserCopy}</p>
            </div>
          </header>

          <nav className="ss-journey-chooser__grid" aria-label="Choose a Sri Lanka travel style">
            <Link href="/tours" className="ss-journey-choice ss-journey-choice--orange">
              <span>01</span>
              <div><small>Private journeys</small><strong>See the whole island</strong><p>Culture, hills, wildlife and coast—arranged around your pace.</p></div>
              <i aria-hidden="true">↗</i>
            </Link>
            <Link href="/airport-hire" className="ss-journey-choice">
              <span>02</span>
              <div><small>Easy arrivals</small><strong>Land without the stress</strong><p>A tracked flight, waiting driver and a clear first road.</p></div>
              <i aria-hidden="true">↗</i>
            </Link>
            <Link href="/bikes" className="ss-journey-choice ss-journey-choice--dark">
              <span>03</span>
              <div><small>Two-wheel freedom</small><strong>Ride your own rhythm</strong><p>Reliable bikes, proper handover and local support.</p></div>
              <i aria-hidden="true">↗</i>
            </Link>
            <Link href="/contact" className="ss-journey-choice ss-journey-choice--soft">
              <span>04</span>
              <div><small>Made for you</small><strong>Build something different</strong><p>Tell us what matters and start with a blank page.</p></div>
              <i aria-hidden="true">↗</i>
            </Link>
          </nav>
        </section>
      </section>

      <section className="ss-dark" aria-labelledby="ss-dark-title">
        <div className="ss-dark__intro">
          <p>{home.bikeEyebrow}</p>
          <h2 id="ss-dark-title"><Multiline text={home.bikeTitle} /></h2>
        </div>

        <div className="ss-mosaic">
          <Link href="/airport-hire" className="ss-orange-card ss-orange-card--wide">
            <span>
              <strong><Multiline text={home.airportCardTitle} /></strong>
              <small>{home.airportCardCopy}</small>
            </span>
            <i className="ss-round-arrow">↗</i>
            <span className="ss-service-tags">Flight tracked · Fixed fare · Meet &amp; greet</span>
          </Link>

          {bikes.slice(0, 2).map((bike) => (
            <Link href="/bikes" className="ss-product-card ss-product-card--dark ss-product-card--link" key={bike.id} aria-label={`View ${bike.name} rental details`}>
              <span className="ss-product-card__image">
                <Image
                  src={bike.image}
                  alt={`${bike.name} motorbike`}
                  fill
                  sizes="(max-width: 760px) 88vw, 25vw"
                  unoptimized={bike.image.startsWith("http")}
                />
              </span>
              <span className="ss-product-card__body">
                <strong>{bike.name}</strong>
                <small>{bike.engineCC}cc · {bike.transmission === "AUTOMATIC" ? "Automatic" : "Manual"}</small>
                <span className="ss-product-card__meta">
                  <em>{bike.available ? "Available" : "Unavailable"}</em>
                  <b>{formatUSD(bike.dailyRateUSD)}<small>/day</small></b>
                </span>
                <span className="ss-product-card__action">View rental details <b aria-hidden="true">→</b></span>
              </span>
            </Link>
          ))}

          {bikes[2] && (
            <Link href="/bikes" className="ss-product-card ss-product-card--dark ss-product-card--link" aria-label={`View ${bikes[2].name} rental details`}>
              <span className="ss-product-card__image">
                <Image
                  src={bikes[2].image}
                  alt={`${bikes[2].name} motorbike`}
                  fill
                  sizes="(max-width: 760px) 88vw, 25vw"
                  unoptimized={bikes[2].image.startsWith("http")}
                />
              </span>
              <span className="ss-product-card__body">
                <strong>{bikes[2].name}</strong>
                <small>{bikes[2].engineCC}cc · {bikes[2].transmission === "AUTOMATIC" ? "Automatic" : "Manual"}</small>
                <span className="ss-product-card__meta">
                  <em>{bikes[2].available ? "Available" : "Unavailable"}</em>
                  <b>{formatUSD(bikes[2].dailyRateUSD)}<small>/day</small></b>
                </span>
                <span className="ss-product-card__action">View rental details <b aria-hidden="true">→</b></span>
              </span>
            </Link>
          )}

          <div className="ss-proof-card">
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

      <section className="ss-story" aria-labelledby="ss-story-title">
        <p className="ss-section-kicker">{home.storyEyebrow}</p>
        <h2 id="ss-story-title">{home.storyTitle}</h2>

        <div className="ss-story__portrait">
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
