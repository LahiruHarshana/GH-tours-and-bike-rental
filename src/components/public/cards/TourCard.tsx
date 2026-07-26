import Link from "next/link";
import type { TourDTO } from "@/types";
import { formatUSD } from "@/lib/utils";
import Image from "next/image";

export function TourCard({ tour, featured = false, index = 0 }: { tour: TourDTO; featured?: boolean; index?: number }) {
  // `tour.location` is a free-form string. Do not infer regions or route lines from it.
  const routeLine = null;
  
  const durationText = tour.durationDays === 1 ? "1 DAY" : `${tour.durationDays} DAYS`;
  
  return (
    <article className={featured ? "tour-card tour-card--featured" : "tour-card"} data-cursor-depth>
      <Link href={`/tours/${tour.slug}`} className="tour-card__link">
        <div className="tour-card__media">
          <div className="tour-card__image">
            <Image 
              src={tour.image} 
              alt={tour.title} 
              loading={featured ? "eager" : "lazy"} 
              decoding="async" 
              width={1920} 
              height={1280} 
              sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            />
          </div>
          <div className="tour-card__glare" aria-hidden="true" />
          <div className="tour-card__veil" aria-hidden="true" />
          <span className="tour-card__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span className="tour-card__badge">{featured ? "Featured journey" : "Private journey"}</span>
        </div>
        <div className="tour-card__body">
          <p className="tour-card__meta">
            {durationText} <span className="sr-only">duration</span>
            <span className="tour-card__meta-divider" aria-hidden="true"> &middot; </span>
            {tour.location}
          </p>
          <h3 className="tour-card__title">{tour.title}</h3>
          
          {routeLine ? (
            <p className="tour-card__route">{routeLine}</p>
          ) : (
            <p className="tour-card__route">Private route · Flexible pacing</p>
          )}

          <div className="tour-card__footer">
            <span className="tour-card__price">
              <span className="sr-only">Starting price</span>
              <small>from</small> <strong>{formatUSD(tour.priceFrom)}</strong>
            </span>
            <span className="tour-card__affordance" aria-hidden="true">
              Explore <i>↗</i>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
