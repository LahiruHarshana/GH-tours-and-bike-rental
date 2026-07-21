"use client";

import Link from "next/link";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { AirportQuickBook } from "@/components/booking/AirportQuickBook";

const services = [
  {
    id: "airport",
    label: "Airport transfer",
    number: "01",
    title: "Meet-and-greet airport pickup",
    copy: "Land softly. We will be waiting. Share your flight, destination and travel date. We track delays and confirm a fixed quotation before you fly.",
    href: "/airport-hire",
    action: "View airport transfers",
    facts: ["Flight monitored", "Private vehicle", "No payment now"],
  },
  {
    id: "tour",
    label: "Private tour",
    number: "02",
    title: "A journey designed around you",
    copy: "Choose a signature journey, then adjust the pace, hotels, experiences and pickup around the people travelling with you.",
    href: "/tours",
    action: "Explore private journeys",
    facts: ["Flexible starts", "Local driver", "Built around you"],
  },
  {
    id: "bike",
    label: "Bike rental",
    number: "03",
    title: "Choose your own island road",
    copy: "Browse maintained scooters and motorcycles with a clear handover, helmets and support from our local team.",
    href: "/bikes",
    action: "See the available fleet",
    facts: ["Safety handover", "Daily rates", "Island support"],
  },
  {
    id: "custom",
    label: "Custom journey",
    number: "04",
    title: "Build something entirely personal",
    copy: "You do not need a finished itinerary. Share your dates, interests and travel style and we will shape the route with you.",
    href: "/contact",
    action: "Design my journey",
    facts: ["Human planning", "Clear quotation", "WhatsApp replies"],
  },
] as const;

export function JourneyPlannerRibbon() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ transform: "translateX(0px)", width: "0px" });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const tablistRef = useRef<HTMLDivElement>(null);
  
  const activeService = services[activeIndex];

  // Update indicator position
  useEffect(() => {
    const activeTab = tabsRef.current[activeIndex];
    const tablist = tablistRef.current;
    
    if (activeTab && tablist) {
      // Small delay to ensure layout is ready
      const update = () => {
        // Calculate relative to the tablist container
        const left = activeTab.offsetLeft;
        const width = activeTab.offsetWidth;
        setIndicatorStyle({ transform: `translateX(${left}px)`, width: `${width}px` });
        
        // Mobile: ensure tab is in view
        if (window.innerWidth <= 1024) {
          activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      };
      
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
  }, [activeIndex]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    let nextIndex = activeIndex;
    
    switch (e.key) {
      case "ArrowRight":
        nextIndex = (activeIndex + 1) % services.length;
        break;
      case "ArrowLeft":
        nextIndex = (activeIndex - 1 + services.length) % services.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = services.length - 1;
        break;
      default:
        return;
    }
    
    e.preventDefault();
    setActiveIndex(nextIndex);
    tabsRef.current[nextIndex]?.focus();
  };

  return (
    <section 
      className="journey-planner" 
      id="book-airport" 
      aria-labelledby="journey-planner-title"
      data-scroll-3d="dolly"
      style={{ "--depth": 0.4 } as React.CSSProperties}
    >
      <div className="visually-hidden" aria-live="polite" aria-atomic="true">
        Selected: {activeService.label}
      </div>

      <div className="journey-planner__tabs" role="tablist" aria-label="Plan your journey" ref={tablistRef}>
        <div className="journey-planner__indicator" style={indicatorStyle} aria-hidden="true" />
        
        {services.map((service, index) => (
          <button
            key={service.id}
            ref={(el) => { tabsRef.current[index] = el; }}
            type="button"
            role="tab"
            id={`planner-tab-${service.id}`}
            aria-selected={activeIndex === index}
            aria-controls={`planner-panel-${service.id}`}
            tabIndex={activeIndex === index ? 0 : -1}
            className="journey-planner__tab"
            onClick={() => setActiveIndex(index)}
            onKeyDown={handleKeyDown}
          >
            <span className="journey-planner__tab-num">{service.number}</span>
            <span className="journey-planner__tab-label">{service.label}</span>
            <span className="journey-planner__tab-desc">{service.title}</span>
          </button>
        ))}
      </div>

      <div className="journey-planner__panel-area">
        <div className="journey-planner__panel-stack">
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div
                key={service.id}
                className="journey-planner__panel"
                id={`planner-panel-${service.id}`}
                role="tabpanel"
                aria-labelledby={`planner-tab-${service.id}`}
                tabIndex={0}
                aria-hidden={!isActive}
              >
                <div className="journey-planner__panel-left">
                  <span>{service.number} · {service.label}</span>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <div className="journey-planner__panel-facts">
                    {service.facts.map((fact) => <span key={fact}>✓ {fact}</span>)}
                  </div>
                </div>
                
                <div className="journey-planner__panel-right">
                  {service.id === "airport" ? (
                    <AirportQuickBook />
                  ) : (
                    <div className="journey-planner__form">
                      <Link className="journey-planner__form-submit" href={service.href}>
                        <span>{service.action}</span>
                        <b aria-hidden="true">→</b>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
