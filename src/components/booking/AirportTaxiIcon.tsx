import type { AirportTaxiId } from "@/types";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function AirportTaxiIcon({ id, className }: { id: AirportTaxiId; className?: string }) {
  if (id === "premium-car") {
    return (
      <svg {...iconProps} className={className}>
        <path d="M4 14h16l-1.2-4.2a1 1 0 0 0-.96-.8H6.16a1 1 0 0 0-.96.8L4 14Z" />
        <path d="M6 14v2.5a1 1 0 0 0 1 1h.75a1 1 0 0 0 1-1V15h6.5v1.5a1 1 0 0 0 1 1H17a1 1 0 0 0 1-1V14" />
        <circle cx="8" cy="17" r="1.1" />
        <circle cx="16" cy="17" r="1.1" />
        <path d="M9 10h6" />
      </svg>
    );
  }

  if (id === "van") {
    return (
      <svg {...iconProps} className={className}>
        <path d="M3 12h18l-1.4-4.5A1 1 0 0 0 18.65 7H5.35a1 1 0 0 0-.95.5L3 12Z" />
        <path d="M5 12v3.5a1 1 0 0 0 1 1h.75a1 1 0 0 0 1-1V14h8.5v1.5a1 1 0 0 0 1 1H19a1 1 0 0 0 1-1V12" />
        <circle cx="7.5" cy="16.5" r="1.1" />
        <circle cx="16.5" cy="16.5" r="1.1" />
        <path d="M10 7V5.5A1.5 1.5 0 0 1 11.5 4h1A1.5 1.5 0 0 1 14 5.5V7" />
      </svg>
    );
  }

  return (
    <svg {...iconProps} className={className}>
      <path d="M4 14h16l-1.5-5H5.5L4 14Z" />
      <path d="M6 14v2.5a1 1 0 0 0 1 1h.75a1 1 0 0 0 1-1V15h6.5v1.5a1 1 0 0 0 1 1H17a1 1 0 0 0 1-1V14" />
      <circle cx="8" cy="17" r="1.1" />
      <circle cx="16" cy="17" r="1.1" />
    </svg>
  );
}
