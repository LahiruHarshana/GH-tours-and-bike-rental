"use client";

import Link from "next/link";
import { useState } from "react";
import { AirportQuickBook } from "@/components/booking/AirportQuickBook";

const services = [
  {
    id: "airport",
    label: "Airport arrival",
    number: "01",
    title: "Land softly. We will be waiting.",
    copy: "Share your flight, destination and travel date. We track delays and confirm a fixed quotation before you fly.",
    href: "/airport-hire",
    action: "View airport transfers",
    facts: ["Flight monitored", "Private vehicle", "No payment now"],
  },
  {
    id: "tour",
    label: "Private tour",
    number: "02",
    title: "Start with a route. Make it your own.",
    copy: "Choose a signature journey, then adjust the pace, hotels, experiences and pickup around the people travelling with you.",
    href: "/tours",
    action: "Explore private journeys",
    facts: ["Flexible starts", "Local driver", "Built around you"],
  },
  {
    id: "bike",
    label: "Bike rental",
    number: "03",
    title: "Choose the ride. Follow the coast.",
    copy: "Browse maintained scooters and motorcycles with a clear handover, helmets and support from our local team.",
    href: "/bikes",
    action: "See the available fleet",
    facts: ["Safety handover", "Daily rates", "Island support"],
  },
  {
    id: "custom",
    label: "Custom journey",
    number: "04",
    title: "Tell us what you want to remember.",
    copy: "You do not need a finished itinerary. Share your dates, interests and travel style and we will shape the route with you.",
    href: "/contact",
    action: "Design my journey",
    facts: ["Human planning", "Clear quotation", "WhatsApp replies"],
  },
] as const;

type ServiceId = (typeof services)[number]["id"];

export function JourneyPlannerRibbon() {
  const [active, setActive] = useState<ServiceId>("airport");
  const selected = services.find((service) => service.id === active) ?? services[0];

  return (
    <section className="journey-planner modern-section" id="book-airport" aria-labelledby="journey-planner-title">
      <div className="container journey-planner__shell">
        <div className="journey-planner__intro">
          <span className="eyebrow"><i />Begin with what you need</span>
          <h2 id="journey-planner-title">One local team.<br />Four ways to begin.</h2>
        </div>

        <div className="journey-planner__tabs" role="tablist" aria-label="Choose a journey service">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              role="tab"
              aria-selected={active === service.id}
              aria-controls={`planner-panel-${service.id}`}
              className={active === service.id ? "is-active" : ""}
              onClick={() => setActive(service.id)}
            >
              <span>{service.number}</span>
              <strong>{service.label}</strong>
            </button>
          ))}
        </div>

        <div className="journey-planner__panel" id={`planner-panel-${selected.id}`} role="tabpanel">
          {selected.id === "airport" ? (
            <AirportQuickBook />
          ) : (
            <div className="planner-teaser" key={selected.id}>
              <div>
                <span>{selected.number} · {selected.label}</span>
                <h3>{selected.title}</h3>
              </div>
              <div>
                <p>{selected.copy}</p>
                <div className="planner-teaser__facts">
                  {selected.facts.map((fact) => <span key={fact}>✓ {fact}</span>)}
                </div>
                <Link className="button button--dark" href={selected.href}>{selected.action} <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
