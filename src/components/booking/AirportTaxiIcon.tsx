import Image from "next/image";
import type { AirportTaxiId } from "@/types";

export const AIRPORT_TAXI_ICON_ASSETS: Record<
  AirportTaxiId,
  { src: string; alt: string; width: number; height: number }
> = {
  "budget-car": {
    src: "/images/airport/budget-car.png",
    alt: "Budget car",
    width: 612,
    height: 412,
  },
  "premium-car": {
    src: "/images/airport/premium-car.png",
    alt: "Premium car",
    width: 670,
    height: 360,
  },
  van: {
    src: "/images/airport/van.png",
    alt: "Van",
    width: 626,
    height: 626,
  },
};

export function AirportTaxiIcon({ id, className }: { id: AirportTaxiId; className?: string }) {
  const icon = AIRPORT_TAXI_ICON_ASSETS[id];

  return (
    <span className={`airport-taxi-icon airport-taxi-icon--${id}${className ? ` ${className}` : ""}`}>
      <Image
        src={icon.src}
        alt={icon.alt}
        width={icon.width}
        height={icon.height}
        className="airport-taxi-icon__image"
        sizes="(max-width: 768px) 28vw, 120px"
      />
    </span>
  );
}
