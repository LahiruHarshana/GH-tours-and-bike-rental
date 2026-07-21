import Link from "next/link";
import type { TourDTO } from "@/types";

const places = [
  { en: "Sigiriya", si: "සීගිරිය" },
  { en: "Ella", si: "ඇල්ල" },
  { en: "Mirissa", si: "මිරිස්ස" },
  { en: "Yala", si: "යාල" },
  { en: "Galle", si: "ගාල්ල" },
];

export function IslandMarquee({ tours }: { tours: TourDTO[] }) {
  const resolveHref = (place: string) => {
    const match = tours.find((tour) => tour.location.toLowerCase().includes(place.toLowerCase()));
    return match ? `/tours/${match.slug}` : "/tours";
  };

  const track = (duplicate: boolean) => (
    <div className="island-marquee__track" aria-hidden={duplicate || undefined}>
      {places.map((place, index) => (
        <Link
          key={`${place.en}-${index}`}
          href={resolveHref(place.en)}
          className="island-marquee__item"
          tabIndex={duplicate ? -1 : 0}
        >
          <span lang="si">{place.si}</span> {place.en.toUpperCase()}
          <i aria-hidden="true">✦</i>
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="island-marquee" aria-label="Explore places across Sri Lanka" data-scroll-motion>
      <div className="island-marquee__stage">
        <div className="island-marquee__viewport">
          <div className="island-marquee__rail">
            {track(false)}
            {track(true)}
          </div>
        </div>
      </div>
    </nav>
  );
}
