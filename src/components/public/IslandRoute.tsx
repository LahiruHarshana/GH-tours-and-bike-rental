"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

const places = [
  {
    id: "colombo",
    number: "01",
    label: "Colombo",
    title: "Arrival and rhythm.",
    copy: "A coastal city where colonial history meets a modern beat. The perfect place to start your journey.",
    note: "Coastal gateway · City energy",
    x: 12,
    y: 74,
  },
  {
    id: "sigiriya",
    number: "02",
    label: "Cultural triangle",
    title: "Ancient stone, early light.",
    copy: "Climb Sigiriya before the heat, walk through old capitals and slow down for temple evenings.",
    note: "Living history · First light",
    x: 34,
    y: 46,
  },
  {
    id: "kandy",
    number: "03",
    label: "Kandy",
    title: "The sacred valley.",
    copy: "Climb through the hills to reach the ancient capital, where temple drums echo across the lake.",
    note: "Sacred city · Hill country",
    x: 28,
    y: 62,
  },
  {
    id: "ella",
    number: "04",
    label: "Ella",
    title: "Cool air, green horizons.",
    copy: "Follow the highland railway through tea fields, waterfalls and small towns made for unhurried mornings.",
    note: "Tea country · Slow mornings",
    x: 38,
    y: 69,
  },
  {
    id: "yala",
    number: "05",
    label: "The wild south",
    title: "Quiet roads, sudden wonder.",
    copy: "Pair wildlife country with rural roads, lagoons and the kind of local stops no fixed script can predict.",
    note: "Wildlife country · Open roads",
    x: 49,
    y: 80,
  },
  {
    id: "mirissa",
    number: "06",
    label: "Southern coast",
    title: "Salt air, room to stay.",
    copy: "Finish among palm-fringed bays, fishing villages, old fort walls and long Indian Ocean sunsets.",
    note: "Southern coast · Sunset finish",
    x: 26,
    y: 91,
  },
] as const;

export function IslandRoute() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [transitionState, setTransitionState] = useState<"idle" | "out" | "in">("idle");
  const [displayedIndex, setDisplayedIndex] = useState<number>(0);
  const lineRef = useRef<SVGPathElement>(null);
  const [routeLength, setRouteLength] = useState(1000);
  const transitionTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const displayedPlace = places[displayedIndex];
  const activePlace = places[activeIndex];

  // Route construction with bezier curves for a hand-drawn feel
  // using midpoints
  const routePath = places.reduce((path, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = places[i - 1];
    // Create a smooth curve between previous point and this point
    // using a control point slightly offset
    const cx = (prev.x + p.x) / 2 + (i % 2 === 0 ? 3 : -3);
    const cy = (prev.y + p.y) / 2 + (i % 2 === 0 ? -3 : 3);
    return `${path} Q ${cx} ${cy} ${p.x} ${p.y}`;
  }, "");

  useEffect(() => {
    if (lineRef.current) {
      setRouteLength(lineRef.current.getTotalLength());
    }
    return () => clearTimeout(transitionTimerRef.current);
  }, []);

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setTransitionState("out");
    clearTimeout(transitionTimerRef.current);

    transitionTimerRef.current = setTimeout(() => {
      setDisplayedIndex(index);
      setTransitionState("in");

      transitionTimerRef.current = setTimeout(() => {
        setTransitionState("idle");
      }, 420); // In duration
    }, 240); // Out duration
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % places.length;
        e.preventDefault();
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + places.length) % places.length;
        e.preventDefault();
        break;
      case "Home":
        nextIndex = 0;
        e.preventDefault();
        break;
      case "End":
        nextIndex = places.length - 1;
        e.preventDefault();
        break;
      default:
        return;
    }
    handleSelect(nextIndex);
    // Focus the target button
    const targetId = places[nextIndex].id;
    document.getElementById(`pin-${targetId}`)?.focus();
  };

  // Calculate perspective shift based on selected point
  const mapPerspectiveOriginX = `${50 + (activePlace.x - 31) * 0.15}%`;
  const mapPerspectiveOriginY = `${50 + (activePlace.y - 50) * 0.15}%`;

  return (
    <section className="section route-explorer modern-section" aria-labelledby="route-explorer-title" data-chapter="04 / ISLAND ROUTE">
      <div className="container route-explorer__head">
        <div>
          <span className="eyebrow"><i />The island, loosely mapped</span>
          <h2 id="route-explorer-title">Every road changes<br />the story.</h2>
        </div>
        <p>Tap a chapter to move across the island. We connect the places you know with the smaller moments that make the journey yours.</p>
      </div>

      <div className="container route-explorer__grid">
        <div
          className="route-map"
          aria-label="Sri Lanka route chapters"
          data-scroll-3d="tilt-reveal"
          data-range="enter"
          style={{
            perspectiveOrigin: `${mapPerspectiveOriginX} ${mapPerspectiveOriginY}`
          } as CSSProperties}
        >
          <div className="route-map__plane">
            <div className="route-map__island-art" aria-hidden="true" />
            <svg className="route-map__svg" viewBox="0 0 62 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <path
                ref={lineRef}
                className="route-map__path"
                d={routePath}
                style={{ "--route-length": routeLength } as CSSProperties}
              />
              {/* Highlight segment to the active pin */}
              <path
                className="route-map__segment"
                d={places.slice(0, activeIndex + 1).reduce((path, p, i) => {
                  if (i === 0) return `M ${p.x} ${p.y}`;
                  const prev = places[i - 1];
                  const cx = (prev.x + p.x) / 2 + (i % 2 === 0 ? 3 : -3);
                  const cy = (prev.y + p.y) / 2 + (i % 2 === 0 ? -3 : 3);
                  return `${path} Q ${cx} ${cy} ${p.x} ${p.y}`;
                }, "")}
              />
            </svg>

            <div className="route-map__annotations" aria-hidden="true">
              <span className="route-map__annotation" style={{ left: "65%", top: "38%" }}>Cultural north</span>
              <span className="route-map__annotation" style={{ left: "60%", top: "62%" }}>Tea country</span>
              <span className="route-map__annotation" style={{ left: "23%", top: "92%" }}>Southern coast</span>
            </div>

            <div className="route-map__pins">
              {places.map((item, index) => {
                // Pin reveal thresholds
                const pinAt = index / (places.length - 1);
                const isActive = activeIndex === index;
                return (
                  <button
                    key={item.id}
                    id={`pin-${item.id}`}
                    type="button"
                    className={`route-map__pin ${isActive ? "is-active" : ""}`}
                    onClick={() => handleSelect(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    aria-pressed={isActive}
                    aria-label={`Stop ${item.number}, ${item.label}`}
                    style={{ left: `${(item.x / 62) * 100}%`, top: `${item.y}%`, "--pin-at": pinAt } as CSSProperties}
                  >
                    <span className="route-map__pin-visual" aria-hidden="true" />
                    <span className="route-map__pin-label" aria-hidden="true">
                      {item.number} {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="route-story">
          <div
            className={`route-story__inner route-story__inner--${transitionState}`}
            aria-live="polite"
            data-chapter={displayedPlace.number}
          >
            <div className="route-story__shade" aria-hidden="true" />
            <div className="route-story__content">
              <span className="route-story__number">Chapter {displayedPlace.number}</span>
              <h3 className="route-story__title">{displayedPlace.title}</h3>
              <p className="route-story__copy">{displayedPlace.copy}</p>

              <div className="route-story__notes">
                <span className="route-story__note-label">Journey character</span>
                <span className="route-story__note-value">{displayedPlace.note}</span>
              </div>

              <Link className="text-link text-link--dark editorial-link" href="/tours">
                <span>Find a journey</span>
                <b aria-hidden="true">↗</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
