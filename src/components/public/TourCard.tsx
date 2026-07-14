import Link from "next/link";
import type { TourDTO } from "@/types";
import { formatUSD } from "@/lib/utils";

export function TourCard({ tour, index = 0 }: { tour: TourDTO; index?: number }) {
  return (
    <article className="tour-card" data-cursor-depth>
      <Link href={`/tours/${tour.slug}`} className="tour-card__image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tour.image} alt={`${tour.title}, ${tour.location}`} loading="lazy" decoding="async" />
        <span className="tour-card__number">0{index + 1}</span>
        <span className="tour-card__duration">{tour.durationDays} days</span>
        <span className="tour-card__veil" aria-hidden="true" />
      </Link>
      <div className="tour-card__body">
        <p className="tour-card__location">{tour.location}</p>
        <h3><Link href={`/tours/${tour.slug}`}>{tour.title}</Link></h3>
        <p>{tour.shortDescription}</p>
        <div className="tour-card__footer">
          <div><small>From</small><strong>{formatUSD(tour.priceFrom)}</strong></div>
          <Link className="round-link" href={`/tours/${tour.slug}`} aria-label={`View ${tour.title}`}><span>↗</span></Link>
        </div>
      </div>
    </article>
  );
}
