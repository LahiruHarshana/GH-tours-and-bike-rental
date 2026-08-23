import Image from "next/image";
import Link from "next/link";
import { signatureDestinations } from "@/lib/signature-destinations";

export function ToursDestinationShowcase() {
  return (
    <section
      className="tours-destinations modern-section"
      aria-labelledby="tours-destinations-title"
      data-scroll-motion
      data-range="enter"
    >
      <div className="tours-destinations__chrome" aria-hidden="true">
        <span className="tours-destinations__chrome-label">
          <i />
          Signature Sri Lanka
        </span>
        <span className="tours-destinations__chrome-count">
          07 <i /> destinations
        </span>
      </div>

      <div className="container tours-destinations__head">
        <p className="tours-destinations__eyebrow">Where we take you</p>
        <h2 id="tours-destinations-title">
          Seven places.
          <br />
          <em>Your custom route.</em>
        </h2>
        <p className="tours-destinations__lead">
          No fixed packages — pick the places that matter to you and we connect them into one
          private journey at your pace.
        </p>
      </div>

      <div className="tours-destinations__rail">
        <div className="tours-destinations__viewport">
          <div className="tours-destinations__track">
            {signatureDestinations.map((place, index) => (
              <article
                key={place.slug}
                className="tours-destinations__card"
                data-cinema="rise"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <Link
                  href={`/custom-tour?destination=${encodeURIComponent(place.name)}`}
                  className="tours-destinations__link"
                >
                  <div className="tours-destinations__media">
                    <Image
                      src={place.image}
                      alt={place.alt}
                      fill
                      sizes="(max-width: 760px) 85vw, 38vw"
                      className="tours-destinations__image"
                      priority={index < 2}
                    />
                    <span className="tours-destinations__watermark" aria-hidden="true">
                      {place.number}
                    </span>
                  </div>
                  <div className="tours-destinations__panel">
                    <div className="tours-destinations__meta">
                      <span className="tours-destinations__name">{place.name}</span>
                      <span className="tours-destinations__si" lang="si">
                        {place.sinhala}
                      </span>
                      <span className="tours-destinations__region">{place.region}</span>
                    </div>
                    <h3>{place.title}</h3>
                    <p>{place.copy}</p>
                    <span className="tours-destinations__mark">
                      Add to my journey <i aria-hidden="true">↗</i>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
        <p className="tours-destinations__hint">Scroll to explore all seven →</p>
      </div>
    </section>
  );
}
