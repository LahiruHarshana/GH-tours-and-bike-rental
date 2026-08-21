import type { AirportTaxiId } from "@/types";

const baseProps = {
  viewBox: "0 0 80 48",
  fill: "none",
  "aria-hidden": true,
};

function Wheel({ cx }: { cx: number }) {
  return (
    <>
      <circle cx={cx} cy="36" r="5.5" fill="currentColor" opacity="0.18" />
      <circle cx={cx} cy="36" r="3.6" fill="currentColor" />
      <circle cx={cx} cy="36" r="1.4" fill="currentColor" opacity="0.35" />
    </>
  );
}

function BudgetCarIcon({ className }: { className?: string }) {
  return (
    <svg {...baseProps} className={className}>
      <path
        d="M8 36h64"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.2"
      />
      <path
        d="M18 30.5h36l3.2-8.4c.6-1.6 2-2.6 3.7-2.6h8.6c1.4 0 2.7.8 3.3 2.1l2.4 5.6c.4.9.6 1.9.6 2.9v1.9H18v-1.5Z"
        fill="currentColor"
      />
      <path
        d="M22 19.5h11.5l2.8 11H22V19.5Z"
        fill="currentColor"
        opacity="0.28"
      />
      <path
        d="M36.5 19.5H49l4.5 11H36.5V19.5Z"
        fill="currentColor"
        opacity="0.22"
      />
      <path
        d="M24 21.5h8.5l1.8 7.5H24V21.5Z"
        fill="#fff"
        opacity="0.78"
      />
      <path
        d="M38.5 21.5H47l2.2 7.5H38.5V21.5Z"
        fill="#fff"
        opacity="0.68"
      />
      <path
        d="M18 30.5h36"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.35"
      />
      <Wheel cx={26} />
      <Wheel cx={54} />
    </svg>
  );
}

function PremiumCarIcon({ className }: { className?: string }) {
  return (
    <svg {...baseProps} className={className}>
      <path
        d="M8 36h64"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.2"
      />
      <path
        d="M12 30.8h56l2.8-7.2c.7-1.8 2.4-3 4.3-3h10.2c1.8 0 3.4 1 4.2 2.7l3.5 7.5v3H12v-3Z"
        fill="currentColor"
      />
      <path
        d="M16 20.6h14.5l3.2 10.2H16V20.6Z"
        fill="currentColor"
        opacity="0.28"
      />
      <path
        d="M32.5 18.8h18l5.8 12.2H32.5V18.8Z"
        fill="currentColor"
        opacity="0.22"
      />
      <path
        d="M18.5 22.8h10.5l2 6.8H18.5v-6.8Z"
        fill="#fff"
        opacity="0.82"
      />
      <path
        d="M35 20.8H49l3.2 8.8H35V20.8Z"
        fill="#fff"
        opacity="0.72"
      />
      <path
        d="M14 30.8h52"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.42"
      />
      <path
        d="M14 28.2h52"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.18"
      />
      <circle cx="58" cy="24.5" r="1.6" fill="currentColor" opacity="0.55" />
      <Wheel cx={22} />
      <Wheel cx={58} />
    </svg>
  );
}

function VanIcon({ className }: { className?: string }) {
  return (
    <svg {...baseProps} className={className}>
      <path
        d="M8 36h64"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.2"
      />
      <path
        d="M14 31h48l2.2-10.5c.5-2.4 2.6-4.1 5.1-4.1h14.8c2.2 0 4.1 1.4 4.8 3.5l2.1 7.4c.3 1 .5 2 .5 3.1v.6H14v-.5Z"
        fill="currentColor"
      />
      <path
        d="M18 16.4h44v14.6H18V16.4Z"
        fill="currentColor"
        opacity="0.24"
      />
      <path d="M20 18.5h8.5v10.5H20V18.5Z" fill="#fff" opacity="0.78" />
      <path d="M31 18.5h8.5v10.5H31V18.5Z" fill="#fff" opacity="0.72" />
      <path d="M42 18.5h8.5v10.5H42V18.5Z" fill="#fff" opacity="0.66" />
      <path d="M53 18.5h7v10.5H53V18.5Z" fill="#fff" opacity="0.58" />
      <path
        d="M31 16.4v15"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.22"
      />
      <path
        d="M42 16.4v15"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.22"
      />
      <path
        d="M53 16.4v15"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.22"
      />
      <path
        d="M14 31h48"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.35"
      />
      <Wheel cx={24} />
      <Wheel cx={56} />
    </svg>
  );
}

export function AirportTaxiIcon({ id, className }: { id: AirportTaxiId; className?: string }) {
  if (id === "premium-car") return <PremiumCarIcon className={className} />;
  if (id === "van") return <VanIcon className={className} />;
  return <BudgetCarIcon className={className} />;
}
