import { signatureDestinations } from "@/lib/signature-destinations";

const labels = signatureDestinations.flatMap((place) => [place.name, place.sinhala]);

export function ToursDestinationMarquee() {
  const track = [...labels, ...labels];

  return (
    <div className="tours-marquee" aria-hidden="true">
      <div className="tours-marquee__track">
        {track.map((label, index) => (
          <span key={`${label}-${index}`}>
            {label}
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}
