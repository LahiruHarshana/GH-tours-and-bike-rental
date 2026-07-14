"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";

const places = [
  {
    id: "culture",
    number: "01",
    label: "Cultural triangle",
    title: "Ancient stone, early light.",
    copy: "Climb Sigiriya before the heat, walk through old capitals and slow down for temple evenings.",
    image: "/images/sigiriya.jpg",
    alt: "Sigiriya rock fortress rising above Sri Lanka's green landscape",
    x: "58%",
    y: "20%",
  },
  {
    id: "hills",
    number: "02",
    label: "Tea country",
    title: "Cool air, green horizons.",
    copy: "Follow the highland railway through tea fields, waterfalls and small towns made for unhurried mornings.",
    image: "/images/train-hills.jpg",
    alt: "Blue Sri Lankan train crossing a stone bridge through the hills",
    x: "43%",
    y: "46%",
  },
  {
    id: "wild",
    number: "03",
    label: "The wild south",
    title: "Quiet roads, sudden wonder.",
    copy: "Pair wildlife country with rural roads, lagoons and the kind of local stops no fixed script can predict.",
    image: "/images/elephant.jpg",
    alt: "Elephant in Sri Lanka's wild landscape",
    x: "63%",
    y: "68%",
  },
  {
    id: "coast",
    number: "04",
    label: "Southern coast",
    title: "Salt air, room to stay.",
    copy: "Finish among palm-fringed bays, fishing villages, old fort walls and long Indian Ocean sunsets.",
    image: "/images/hero-coast.jpg",
    alt: "Palm-fringed bay on Sri Lanka's southern coast",
    x: "35%",
    y: "86%",
  },
] as const;

type PlaceId = (typeof places)[number]["id"];

export function IslandRoute() {
  const [active, setActive] = useState<PlaceId>(places[0].id);
  const place = places.find((item) => item.id === active) ?? places[0];

  return (
    <section className="section route-explorer modern-section" aria-labelledby="route-explorer-title">
      <div className="container route-explorer__head">
        <div>
          <span className="eyebrow"><i />The island, loosely mapped</span>
          <h2 id="route-explorer-title">Every road changes<br />the story.</h2>
        </div>
        <p>Tap a chapter to move across the island. We connect the places you know with the smaller moments that make the journey yours.</p>
      </div>

      <div className="container route-explorer__grid">
        <div className="route-explorer__map" aria-label="Sri Lanka route chapters">
          <span className="route-explorer__island" aria-hidden="true" />
          <span className="route-explorer__path" aria-hidden="true" />
          <span className="route-explorer__coordinate route-explorer__coordinate--top">08.3114° N</span>
          <span className="route-explorer__coordinate route-explorer__coordinate--bottom">80.4037° E</span>
          {places.map((item) => (
            <button
              key={item.id}
              type="button"
              className={active === item.id ? "is-active" : ""}
              onClick={() => setActive(item.id)}
              aria-pressed={active === item.id}
              style={{ "--route-x": item.x, "--route-y": item.y } as CSSProperties}
            >
              <i />
              <span>{item.number}</span>
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>

        <div className="route-explorer__story" aria-live="polite">
          <figure key={place.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={place.image} alt={place.alt} />
            <figcaption>{place.number} / 04 · {place.label}</figcaption>
          </figure>
          <div key={`${place.id}-copy`}>
            <span>Chapter {place.number}</span>
            <h3>{place.title}</h3>
            <p>{place.copy}</p>
            <Link className="text-link text-link--dark editorial-link" href="/tours"><span>Find a journey</span><b aria-hidden="true">↗</b></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
