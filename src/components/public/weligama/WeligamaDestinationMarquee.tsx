"use client";

const destinations = [
  "Mirissa",
  "Midigama",
  "Ahangama",
  "Matara",
  "Galle",
  "Yala",
  "Ella",
  "Weligama Bay",
  "Coconut Hill",
  "Unawatuna",
] as const;

export function WeligamaDestinationMarquee() {
  const items = [...destinations, ...destinations];

  return (
    <div className="weligama-marquee" aria-hidden="true">
      <div className="weligama-marquee__track">
        {items.map((name, index) => (
          <span key={`${name}-${index}`}>
            {name}
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}
