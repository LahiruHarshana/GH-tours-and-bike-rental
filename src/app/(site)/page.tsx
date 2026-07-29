import Image from "next/image";
import Link from "next/link";
import { getBikes, getTours } from "@/lib/data";
import { formatUSD } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

const guestStats = [
  { value: "4.9/5", label: "Guest rating", detail: "From travellers who explored with us" },
  { value: "20 min", label: "Typical reply", detail: "A real local team, ready every day" },
  { value: "100%", label: "Private journeys", detail: "Every route shaped around your pace" },
];

export default async function HomePage() {
  const [tours, bikes] = await Promise.all([
    getTours({ featured: true, limit: 3 }),
    getBikes({ limit: 3 }),
  ]);

  return (
    <div className="stayscape-home">
      <div id="hero-sentinel" className="stayscape-sentinel" />

      <section className="ss-hero" aria-labelledby="ss-hero-title">
        <p className="ss-hero__eyebrow">Private Sri Lanka journeys</p>
        <h1 id="ss-hero-title">Sri Lanka,<br />at your pace.</h1>

        <div className="ss-hero__visual">
          <Image
            src="/images/hero-sigiriya-cinematic.webp"
            alt="Sigiriya rock fortress rising above Sri Lanka's green central plains"
            fill
            priority
            sizes="(max-width: 700px) 100vw, 96vw"
          />
          <div className="ss-hero__caption">
            <span>7.8731° N</span>
            <strong>Ancient wonder</strong>
            <span>80.7718° E</span>
          </div>
        </div>

        <div className="ss-planner" aria-label="Journey planner">
          <Link href="/tours" className="ss-planner__item">
            <small>Journey</small>
            <strong>Private Sri Lanka tours</strong>
          </Link>
          <Link href="/airport-hire" className="ss-planner__item">
            <small>Arrival</small>
            <strong>Airport meet &amp; greet</strong>
          </Link>
          <Link href="/bikes" className="ss-planner__item">
            <small>Ride</small>
            <strong>Motorbike rental</strong>
          </Link>
          <Link href="/contact" className="ss-round-arrow" aria-label="Design my journey">↗</Link>
        </div>

        <div className="ss-hero__promise">
          <p>From the first airport hello to the last ocean sunset, every private journey is shaped around how you want the island to feel.</p>
          <ul aria-label="Journey assurances">
            <li>Locally planned</li>
            <li>Flexible by design</li>
            <li>Real support, every day</li>
          </ul>
        </div>
      </section>

      <section className="ss-experiences" aria-labelledby="ss-experiences-title">
        <p className="ss-section-kicker">Signature journeys</p>
        <h2 id="ss-experiences-title">Sri Lanka,<br />thoughtfully arranged.</h2>
        <p className="ss-section-copy">Start with one of our most-loved routes. Every itinerary can be adjusted around your arrival, pace and interests.</p>

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
                <Image src={tour.image} alt={tour.title} fill sizes="(max-width: 760px) 88vw, 25vw" />
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

        <div className="ss-manifesto">
          <span lang="si">ආයුබෝවන්</span>
          <div>
            <small>May you live long</small>
            <p>Sri Lanka is small on the map, but every road changes the story. Ancient stone cities become tea-covered mountains, then wild parks, fishing villages and warm Indian Ocean shores.</p>
          </div>
        </div>
      </section>

      <section className="ss-dark" aria-labelledby="ss-dark-title">
        <div className="ss-dark__intro">
          <p>Freedom on two wheels</p>
          <h2 id="ss-dark-title">Choose the ride.<br />Follow the coast.</h2>
        </div>

        <div className="ss-mosaic">
          <Link href="/airport-hire" className="ss-orange-card ss-orange-card--wide">
            <span>
              <strong>From arrivals hall<br />to island calm.</strong>
              <small>Your driver waits with your name, helps with luggage and takes the best route—whether you are heading to Colombo, Galle, Kandy, Ella or beyond.</small>
            </span>
            <i className="ss-round-arrow">↗</i>
            <span className="ss-service-tags">Flight tracked · Fixed fare · Meet &amp; greet</span>
          </Link>

          {bikes.slice(0, 2).map((bike) => (
            <article className="ss-product-card ss-product-card--dark" key={bike.id}>
              <span className="ss-product-card__image">
                <Image src={bike.image} alt={`${bike.name} motorbike`} fill sizes="(max-width: 760px) 88vw, 25vw" />
              </span>
              <span className="ss-product-card__body">
                <strong>{bike.name}</strong>
                <small>{bike.engineCC}cc · {bike.transmission === "AUTOMATIC" ? "Automatic" : "Manual"}</small>
                <span className="ss-product-card__meta">
                  <em>{bike.available ? "Available" : "Unavailable"}</em>
                  <b>{formatUSD(bike.dailyRateUSD)}<small>/day</small></b>
                </span>
              </span>
            </article>
          ))}

          {bikes[2] && (
            <article className="ss-product-card ss-product-card--dark">
              <span className="ss-product-card__image">
                <Image src={bikes[2].image} alt={`${bikes[2].name} motorbike`} fill sizes="(max-width: 760px) 88vw, 25vw" />
              </span>
              <span className="ss-product-card__body">
                <strong>{bikes[2].name}</strong>
                <small>{bikes[2].engineCC}cc · {bikes[2].transmission === "AUTOMATIC" ? "Automatic" : "Manual"}</small>
                <span className="ss-product-card__meta">
                  <em>{bikes[2].available ? "Available" : "Unavailable"}</em>
                  <b>{formatUSD(bikes[2].dailyRateUSD)}<small>/day</small></b>
                </span>
              </span>
            </article>
          )}

          <div className="ss-proof-card">
            <div className="ss-proof-card__intro">
              <strong>Small details.<br />Big difference.</strong>
              <p>Thoughtful planning, quick answers and a journey that always feels like your own.</p>
            </div>
            <div className="ss-proof-card__stats">
              {guestStats.map((stat) => (
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
          “It felt less like following a tour and more like travelling with someone who genuinely wanted us to love the island.”
          <footer>Maya &amp; Daniel · United Kingdom · Cultural Triangle</footer>
        </blockquote>
      </section>

      <section className="ss-story" aria-labelledby="ss-story-title">
        <p className="ss-section-kicker">The island in five movements</p>
        <h2 id="ss-story-title">Sri Lanka</h2>

        <div className="ss-story__portrait">
          <Image src="/images/elephant.webp" alt="An elephant in the Sri Lankan wilderness" fill sizes="(max-width: 700px) 72vw, 28vw" />
          <div className="ss-story__overlay">
            <span>Stone</span>
            <span>Tea</span>
            <span>Wild</span>
            <span>Road</span>
            <span>Sea</span>
          </div>
        </div>

        <div className="ss-story__side ss-story__side--left">
          <Link href="/about">Our story</Link>
        </div>
        <div className="ss-story__side ss-story__side--right">
          <Link href="/contact">Contact</Link>
        </div>

        <div className="ss-final-cta">
          <p>Your island story starts here</p>
          <h2>Tell us where<br />you want to<br /><em>wake up</em> next.</h2>
          <span className="ss-final-cta__arrow">↗</span>
          <div className="ss-final-cta__copy">
            <p>Share your dates, interests and travel style. We will shape a route that feels unmistakably yours.</p>
            <div>
              <Link href="/contact">Plan a custom journey</Link>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">Chat on WhatsApp ↗</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
