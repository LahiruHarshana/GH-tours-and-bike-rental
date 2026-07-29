import { Reveal } from "@/components/public/motion/Reveal";
import { TourCard } from "@/components/public/cards/TourCard";
import { HeroShowcase } from "@/components/public/HeroShowcase";
import { IslandStoryReel } from "@/components/public/IslandStoryReel";
import { JourneyPlannerRibbon } from "@/components/public/navigation/JourneyPlannerRibbon";
import { IslandRoute } from "@/components/public/IslandRoute";
import { IslandMarquee } from "@/components/public/navigation/IslandMarquee";
import { CinematicHeading } from "@/components/public/typography/CinematicHeading";
import { Section } from "@/components/public/layout/Section";
import { SectionHeading } from "@/components/public/typography/SectionHeading";
import { TextLink } from "@/components/public/actions/TextLink";

import { MagneticLink } from "@/components/public/actions/MagneticLink";
import { EditorialRail } from "@/components/public/collections/EditorialRail";
import { BikeBookingButton } from "@/components/booking/BikeBookingButton";
import { getBikes, getTours } from "@/lib/data";
import { siteConfig } from "@/config/site";
import { formatUSD } from "@/lib/utils";
import Image from "next/image";
import type { BikeDTO } from "@/types";

export const dynamic = "force-dynamic";

const bikeCategoryLabel: Record<BikeDTO["category"], string> = {
  SCOOTER: "Scooter",
  MOTORBIKE: "Motorbike",
  ADVENTURE: "Adventure",
};

const bikeBestFor: Record<BikeDTO["category"], string> = {
  SCOOTER: "City & coast",
  MOTORBIKE: "Mixed terrain",
  ADVENTURE: "Hills & backroads",
};

const guestStats = [
  { value: "4.9", suffix: "/5", label: "Guest rating", detail: "From travellers who explored with us" },
  { value: "20", suffix: " min", label: "Typical reply", detail: "A real local team, ready every day" },
  { value: "100", suffix: "%", label: "Private journeys", detail: "Every route shaped around your pace" },
];

export default async function HomePage() {
  const [tours, bikes] = await Promise.all([
    getTours({ featured: true, limit: 12 }),
    getBikes({ limit: 4 }),
  ]);

  return (
    <>
      <div id="hero-sentinel" style={{ position: "absolute", top: 0, height: "80vh", width: 1, pointerEvents: "none" }} />
      <HeroShowcase />
      <JourneyPlannerRibbon />

      <Section id="manifesto" className="manifesto" spacing="airy" data-chapter="01 / MANIFESTO">
        <div className="manifesto__inner">
          <div className="manifesto__greeting" data-scroll-motion>
            <span lang="si" className="manifesto__greeting-word">ආයුබෝවන්</span>
            <span className="manifesto__translation">May you live long</span>
          </div>

          <p className="manifesto__copy" data-scroll-motion>
            {(() => {
              const manifestoText = "Sri Lanka is small on the map, but every road changes the story. Ancient stone cities become tea-covered mountains, then wild parks, fishing villages and warm Indian Ocean shores.";
              const words = manifestoText.split(" ");
              return words.map((word, index) => {
                if (index === 0 && word.length > 0) {
                  return (
                    <span className="manifesto-word" style={{ "--i": index } as React.CSSProperties} key={`${word}-${index}`}>
                      <span className="manifesto__dropcap" data-scroll-3d="dolly" style={{ "--depth": 0.5 } as React.CSSProperties}>{word[0]}</span>
                      {word.slice(1)}{" "}
                    </span>
                  );
                }
                return (
                  <span className="manifesto-word" style={{ "--i": index } as React.CSSProperties} key={`${word}-${index}`}>
                    {word}{" "}
                  </span>
                );
              });
            })()}
          </p>

          <span className="manifesto__mark" aria-hidden="true" />
        </div>
      </Section>

      <IslandStoryReel />

      <Section data-chapter="03 / JOURNEYS" tone="sand" className="featured-tours modern-section">
        <div className="section-topline" data-scroll-motion data-range="enter">
          <Reveal>
            <SectionHeading
              className="journeys-heading"
              eyebrow="Signature journeys"
              title={<CinematicHeading lines={["Sri Lanka,", "thoughtfully arranged."]} />}
            >
              <p>Start with one of our most-loved routes. Every itinerary can be adjusted around your arrival, pace and interests.</p>
            </SectionHeading>
          </Reveal>
          {tours[0] && (
            <figure className="featured-tours__intro-art" data-scroll-motion data-range="enter">
              <Image
                src={tours[0].image}
                alt=""
                aria-hidden="true"
                width={900}
                height={1100}
                sizes="(max-width: 768px) 70vw, 28vw"
              />
              <figcaption>
                <span>Designed around you</span>
                <strong>Private · Flexible · Local</strong>
              </figcaption>
              <i aria-hidden="true">03</i>
            </figure>
          )}
          <TextLink variant="dark" className="editorial-link" href="/tours"><span>View all tours</span><b aria-hidden="true">↗</b></TextLink>
        </div>
        <div className="collection-shell">
          <div className="journey-grid" data-scroll-3d="deck" data-range="enter">
            <EditorialRail label="Signature journey collection" variant="journeys">
              {tours.map((tour, index) => (
                <div
                  className={index === 0 ? "journey-grid__item journey-grid__item--featured" : "journey-grid__item"}
                  style={{ "--i": index } as React.CSSProperties}
                  key={tour.id}
                >
                  <TourCard tour={tour} featured={index === 0} index={index} />
                </div>
              ))}
            </EditorialRail>
          </div>
        </div>
      </Section>

      <IslandRoute />

      <Section id="airport" data-chapter="05 / AIRPORT TRANSFERS" width="full" className="airport-story">
        <div className="airport-story__stage">
          <figure className="airport-story__photo" data-scroll-3d="curtain" data-range="enter">
            <Image
              src="/images/south-coast.webp"
              alt="A calm coastal road view after arriving in Sri Lanka"
              loading="lazy"
              decoding="async"
              width={1920}
              height={1280}
              sizes="(max-width: 1024px) 100vw, 62vw"
            />
          </figure>

          <div className="airport-story__flight" data-scroll-motion data-range="enter" aria-hidden="true">
            <svg className="airport-story__flightsvg" viewBox="0 0 220 130">
              <path
                className="airport-story__flightpath"
                d="M18,112 Q112,8 202,42"
                pathLength="100"
              />
            </svg>
            <span className="airport-story__aircraft" />
          </div>

          <div className="airport-story__card" data-scroll-3d="door" data-range="enter">
            <span className="airport-story__cmb" aria-hidden="true">CMB</span>

            <Reveal>
              <SectionHeading
                className="airport-heading"
                eyebrow="Your first good decision"
                title={<CinematicHeading lines={["From arrivals hall", "to island calm."]} />}
              >
                <p>Your driver waits with your name, helps with luggage and takes the best route—whether you are heading to Colombo, Galle, Kandy, Ella or beyond.</p>
              </SectionHeading>
            </Reveal>

            <ul className="airport-story__strip">
              <li style={{ "--i": 0 } as React.CSSProperties} data-scroll-3d="tilt-reveal" data-range="enter"><span>Flight tracked</span><strong>Live</strong></li>
              <li style={{ "--i": 1 } as React.CSSProperties} data-scroll-3d="tilt-reveal" data-range="enter"><span>Fixed fare</span><strong>Quoted</strong></li>
              <li style={{ "--i": 2 } as React.CSSProperties} data-scroll-3d="tilt-reveal" data-range="enter"><span>Meet &amp; greet</span><strong>Nameboard</strong></li>
              <li style={{ "--i": 3 } as React.CSSProperties} data-scroll-3d="tilt-reveal" data-range="enter"><span>Child seats</span><strong>On request</strong></li>
            </ul>

            <MagneticLink className="button button--dark" href="/airport-hire">Arrange my transfer <span aria-hidden="true">↑</span></MagneticLink>
          </div>
        </div>
      </Section>

      <Section id="fleet" data-chapter="06 / MOTORBIKE FLEET" width="full" spacing="compact" className="fleet modern-section">
        <figure className="fleet__band">
          <Image
            src="/images/bike-road.webp"
            alt="A motorbike parked on a quiet coastal Sri Lankan road"
            loading="lazy"
            decoding="async"
            width={1920}
            height={1000}
            sizes="100vw"
          />
          <div className="fleet__band-inner container">
            <Reveal>
              <SectionHeading
                className="fleet-heading"
                eyebrowVariant="light"
                eyebrow="Freedom on two wheels"
                title={<CinematicHeading lines={["Choose the ride.", "Follow the coast."]} />}
              >
                <p>Well-maintained bikes, transparent daily rates and local assistance from pickup to return.</p>
              </SectionHeading>
            </Reveal>
            <TextLink variant="light" className="editorial-link" href="/bikes"><span>See full fleet</span><b aria-hidden="true">↗</b></TextLink>
          </div>
        </figure>

        <div className="container fleet__table-wrap">
          <table className="fleet__table">
            <caption className="visually-hidden">Comparison of engine size, type, transmission, best-for terrain and daily rate across the motorbike fleet</caption>
            <thead>
              <tr>
                <th scope="col" className="fleet__row-label" data-col="label"><span className="visually-hidden">Specification</span></th>
                {bikes.map((bike, index) => (
                  <th scope="col" className="fleet__column" data-col={index} data-scroll-3d="tilt-reveal" data-range="enter" data-cursor-depth style={{ "--i": index } as React.CSSProperties} key={bike.id}>
                    <span className="fleet__image">
                      <Image src={bike.image} alt={`${bike.name} motorbike`} loading="lazy" decoding="async" width={640} height={640} sizes="(max-width: 640px) 40vw, 220px" />
                    </span>
                    <span className="fleet__name">{bike.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ "--row-i": 0 } as React.CSSProperties}>
                <th scope="row">Engine</th>
                {bikes.map((bike, index) => <td className="fleet__cell" data-col={index} key={bike.id}>{bike.engineCC}cc</td>)}
              </tr>
              <tr style={{ "--row-i": 1 } as React.CSSProperties}>
                <th scope="row">Type</th>
                {bikes.map((bike, index) => <td className="fleet__cell" data-col={index} key={bike.id}>{bikeCategoryLabel[bike.category]}</td>)}
              </tr>
              <tr style={{ "--row-i": 2 } as React.CSSProperties}>
                <th scope="row">Transmission</th>
                {bikes.map((bike, index) => <td className="fleet__cell" data-col={index} key={bike.id}>{bike.transmission === "AUTOMATIC" ? "Automatic" : "Manual"}</td>)}
              </tr>
              <tr style={{ "--row-i": 3 } as React.CSSProperties}>
                <th scope="row">Best for</th>
                {bikes.map((bike, index) => <td className="fleet__cell" data-col={index} key={bike.id}>{bikeBestFor[bike.category]}</td>)}
              </tr>
              <tr className="fleet__row--price" style={{ "--row-i": 4 } as React.CSSProperties}>
                <th scope="row">Per day</th>
                {bikes.map((bike, index) => <td className="fleet__cell" data-col={index} key={bike.id}><strong>{formatUSD(bike.dailyRateUSD)}</strong></td>)}
              </tr>
              <tr className="fleet__row--book" style={{ "--row-i": 5 } as React.CSSProperties}>
                <th scope="row" className="visually-hidden">Book</th>
                {bikes.map((bike, index) => (
                  <td className="fleet__cell" data-col={index} key={bike.id}>
                    <BikeBookingButton bike={bike} disabled={!bike.available || bike.quantity < 1} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="proof" data-chapter="07 / PROOF" spacing="compact" tone="ink" width="full" className="proof-bar">
        <div className="container proof-bar__shell">
          <div className="proof-bar__intro" data-scroll-motion data-range="enter">
            <div>
              <span className="proof-bar__eyebrow"><i />Why travel with us</span>
              <h2>Small details.<br /><em>Big difference.</em></h2>
            </div>
            <p>Thoughtful planning, quick answers and a journey that always feels like your own.</p>
          </div>

          <div className="proof-bar__grid">
            {guestStats.map((stat, index) => (
              <article
                className="proof-bar__stat"
                data-scroll-motion
                data-range="enter"
                style={{ "--i": index } as React.CSSProperties}
                key={stat.label}
              >
                <span className="proof-bar__index" aria-hidden="true">0{index + 1}</span>
                <p className="proof-bar__value">
                  <strong>{stat.value}</strong><span>{stat.suffix}</span>
                </p>
                <h3>{stat.label}</h3>
                <p className="proof-bar__detail">{stat.detail}</p>
                <span className="proof-bar__rule" aria-hidden="true"><i /></span>
              </article>
            ))}
          </div>

          <div className="proof-bar__foot" aria-hidden="true">
            <span>Based in Sri Lanka</span>
            <i />
            <span>Private · Flexible · Local</span>
          </div>
        </div>
      </Section>

      <Section id="guest-stories" data-chapter="08 / MADE PERSONAL" className="trust-editorial">
        <div className="container trust-editorial__shell">
          <div className="trust-editorial__topline" aria-hidden="true">
            <span><i />Notes from the road</span>
            <span>Private · Flexible · Local</span>
          </div>

          <div className="trust-editorial__grid">
            <article className="trust-editorial__quote" data-scroll-3d="tilt-reveal" data-range="enter">
              <span className="trust-editorial__mark" aria-hidden="true">&ldquo;</span>
              <blockquote>It felt less like following a tour and more like travelling with someone who genuinely wanted us to love the island.</blockquote>
              <footer>
                <span className="trust-editorial__avatar" aria-hidden="true">M+D</span>
                <span>
                  <strong>Maya &amp; Daniel</strong>
                  <small>United Kingdom · Cultural Triangle</small>
                </span>
              </footer>
            </article>

            <aside className="trust-editorial__principles" aria-label="How we travel">
              <div className="trust-editorial__principles-head">
                <span>How we travel</span>
                <p>The best journeys leave room for the unexpected.</p>
              </div>
              <ol>
                {[
                  { title: "Local, not scripted", copy: "A team that knows the roads, seasons and small details no map can tell you." },
                  { title: "Clear from the start", copy: "A confirmed quotation before you travel, without hidden stops or commissions." },
                  { title: "Here when it matters", copy: "Real WhatsApp support before, during and after your journey." },
                ].map((value, index) => (
                  <li data-scroll-motion data-range="enter" style={{ "--i": index } as React.CSSProperties} key={value.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{value.title}</h3>
                      <p>{value.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <TextLink variant="dark" href="/about"><span>Meet your local team</span> ↗</TextLink>
            </aside>
          </div>
        </div>
      </Section>

      <IslandMarquee tours={tours} />

      <Section id="cta" data-chapter="10 / THE INVITATION" width="full" spacing="airy" tone="ink" className="cta-section">
        <div className="cta-section__stage" data-scroll-motion data-range="enter">
          <div className="cta-photo" style={{ position: "absolute" }}>
            <Image
              src="/images/hero-coast.webp"
              alt="Sri Lanka's coastline at dusk"
              loading="lazy"
              decoding="async"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <span className="cta-bloom" aria-hidden="true" />

          <div className="container cta-section__inner">
            <Reveal>
              <div className="cta-headline">
                <SectionHeading
                  align="center"
                  eyebrow="Your island story starts here"
                  eyebrowVariant="light"
                  title={
                    <CinematicHeading
                      lines={["Tell us where", "you want to", <><em>wake up</em> next.</>]}
                    />
                  }
                >
                  <p>Share your dates, interests and travel style. We will shape a route that feels unmistakably yours.</p>
                </SectionHeading>
                <div className="cta-section__actions">
                  <MagneticLink className="button button--gold" href="/contact">Plan a custom journey <span aria-hidden="true">↗</span></MagneticLink>
                  <TextLink variant="light" external href={`https://wa.me/${siteConfig.whatsapp}`}><span>Chat on WhatsApp</span> ↗</TextLink>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="cta-section__foot container">
            <span className="hairline" aria-hidden="true" />
            <span className="cta-index" aria-hidden="true">06&deg; 01&apos; N &middot; 80&deg; 47&apos; E</span>
          </div>
        </div>
      </Section>
    </>
  );
}
