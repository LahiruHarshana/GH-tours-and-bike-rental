import Link from "next/link";

type ServiceBarProps = {
  active?: "tours" | "airport" | "bikes" | "contact";
};

const services = [
  { key: "tours", eyebrow: "Explore", label: "Private Sri Lanka tours", href: "/tours" },
  { key: "airport", eyebrow: "Arrive", label: "Airport hire", href: "/airport-hire" },
  { key: "bikes", eyebrow: "Ride", label: "Motorbike rental", href: "/bikes" },
] as const;

export function ServiceBar({ active }: ServiceBarProps) {
  const mobilePrimary = active === "airport" || active === "bikes" || active === "tours" ? active : "tours";

  return (
    <nav className="ss-inner-services" aria-label="Explore our services">
      <div className="ss-planner">
        {services.map((service) => (
          <Link
            key={service.key}
            href={service.href}
            className={`ss-planner__item${active === service.key ? " is-active" : ""}${mobilePrimary === service.key ? " is-mobile-primary" : ""}`}
            aria-current={active === service.key ? "page" : undefined}
          >
            <small>{service.eyebrow}</small>
            <strong>{service.label}</strong>
          </Link>
        ))}
        <Link
          href="/contact"
          className={`ss-round-arrow${active === "contact" ? " is-active" : ""}`}
          aria-label="Plan a custom journey"
          aria-current={active === "contact" ? "page" : undefined}
        >
          ↗
        </Link>
      </div>
    </nav>
  );
}
