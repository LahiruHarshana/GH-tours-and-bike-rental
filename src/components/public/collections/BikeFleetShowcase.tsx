"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookingModal } from "@/components/booking/BookingModal";
import { BikeFleetImage } from "@/components/public/collections/BikeFleetImage";
import { getBikeMobileImage } from "@/lib/bike-mobile-images";
import type { BikeDTO } from "@/types";

function formatCategory(category: BikeDTO["category"]) {
  if (category === "MOTORBIKE") return "Motorbike";
  if (category === "ADVENTURE") return "Adventure";
  return "Scooter";
}

export function BikeFleetShowcase({ bikes }: { bikes: BikeDTO[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingBike, setBookingBike] = useState(bikes[0]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let isCancelled = false;
    setTimeout(() => {
      if (!isCancelled && mediaQuery.matches) {
        setReducedMotion(true);
      }
    }, 0);

    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mediaQuery.addEventListener("change", onChange);

    if (mediaQuery.matches) {
      setTimeout(() => setIsReady(true), 0);
      return () => mediaQuery.removeEventListener("change", onChange);
    }

    if (!sectionRef.current) return () => mediaQuery.removeEventListener("change", onChange);

    const imgs = Array.from(
      sectionRef.current.querySelectorAll<HTMLImageElement>(
        ".story-reel__image img, .bike-fleet-picture__img",
      ),
    );

    Promise.allSettled(
      imgs.map((img) => {
        if (img.complete) return Promise.resolve();
        return img.decode
          ? img.decode().catch(() => {})
          : new Promise<void>((resolve) => {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            });
      }),
    ).then(() => {
      if (!isCancelled) setIsReady(true);
    });

    return () => {
      isCancelled = true;
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const onScroll = () => {
      if (!sectionRef.current) return;
      const progressStr = sectionRef.current.style.getPropertyValue("--reel-progress");
      if (!progressStr) return;
      const progress = Number.parseFloat(progressStr);
      const index = Math.round(progress * (bikes.length - 1));
      setActiveIndex((current) => (current === index ? current : index));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion, bikes.length]);

  const jumpTo = (index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const top = window.scrollY + rect.top;

    if (reducedMotion) {
      const articles = sectionRef.current.querySelectorAll("article");
      const targetArticle = articles[index];
      if (targetArticle) {
        const articleRect = targetArticle.getBoundingClientRect();
        window.scrollTo({
          top: window.scrollY + articleRect.top - 100,
          behavior: "auto",
        });
      }
      return;
    }

    const height = rect.height - window.innerHeight;
    const target = top + (index / Math.max(bikes.length - 1, 1)) * height;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const openBooking = (bike: BikeDTO) => {
    setBookingBike(bike);
    setBookingOpen(true);
  };

  const activeBike = bikes[activeIndex] ?? bikes[0];
  if (!activeBike) return null;

  return (
    <>
      <section
        ref={sectionRef}
        className={isReady ? "story-reel ss-bike-reel story-reel--ready" : "story-reel ss-bike-reel"}
        data-scroll-reel
        data-chapter="02 / BIKE FLEET"
        aria-label="Browse our bike fleet"
      >
        <div className="story-reel__sticky">
          <div className="story-reel__stage">
            <div className="story-reel__chrome" aria-hidden="true">
              <span className="story-reel__chrome-label">
                <i />
                {activeBike.brand} · {activeBike.engineCC} cc ·{" "}
                {activeBike.transmission === "AUTOMATIC" ? "Auto" : "Manual"}
              </span>
              <span className="story-reel__chrome-count">
                {String(activeIndex + 1).padStart(2, "0")} <i /> {String(bikes.length).padStart(2, "0")}
              </span>
            </div>

            <div className="story-reel__frames">
              {bikes.map((bike, index) => (
                <figure
                  data-reel-frame
                  key={bike.id}
                  className="story-reel__frame"
                  style={{ zIndex: bikes.length - index }}
                >
                  <div className="story-reel__image">
                    <BikeFleetImage
                      desktopSrc={bike.image}
                      mobileSrc={getBikeMobileImage(bike.slug)}
                      alt={`${bike.name} available for rental in Sri Lanka`}
                      priority={index < 2}
                      unoptimized={bike.image.startsWith("http")}
                    />
                  </div>
                  <div className="story-reel__number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </figure>
              ))}
            </div>

            <div className="story-reel__content-layer">
              {bikes.map((bike) => {
                const available = bike.available && bike.quantity > 0;
                return (
                  <article data-reel-copy key={bike.id} className="story-reel__copy">
                    <div className="story-reel__copy-card ss-bike-reel__card">
                      <div className="ss-bike-reel__meta">
                        <span>{bike.brand}</span>
                        <span aria-hidden="true">·</span>
                        <span>{formatCategory(bike.category)}</span>
                        <span className="ss-bike-reel__badge">{bike.engineCC} cc</span>
                      </div>
                      <h3>{bike.name}</h3>
                      <p>{bike.features.slice(0, 3).join(" · ")}</p>
                      <div className="ss-bike-reel__specs" aria-label="Bike specifications">
                        <span>{bike.transmission === "AUTOMATIC" ? "Automatic" : "Manual"}</span>
                        <span>{bike.fuelType === "ELECTRIC" ? "Electric" : "Petrol"}</span>
                        <span>{bike.seats} seats</span>
                      </div>
                      <div className="ss-bike-reel__actions">
                        <button
                          type="button"
                          className="ss-bike-reel__cta"
                          disabled={!available}
                          onClick={() => openBooking(bike)}
                        >
                          {available ? "Request this bike" : "Unavailable"}
                          <span aria-hidden="true">↗</span>
                        </button>
                        <Link href={`/bikes?bike=${encodeURIComponent(bike.slug)}`} className="ss-bike-reel__link">
                          Full details
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <nav className="story-reel__timeline ss-bike-reel__timeline" aria-label="Bike fleet chapters">
              {bikes.map((bike, index) => (
                <button
                  key={bike.id}
                  type="button"
                  className="story-reel__timeline-button ss-bike-reel__timeline-button"
                  aria-label={`Jump to ${bike.name}`}
                  aria-current={activeIndex === index ? "step" : undefined}
                  onClick={() => jumpTo(index)}
                >
                  <span className="ss-bike-reel__timeline-no" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="ss-bike-reel__timeline-name">{bike.name}</span>
                </button>
              ))}
            </nav>

            <Link href="/bikes" className="ss-bike-reel__fleet-cta">
              Browse full fleet
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        type="BIKE"
        sourceId={bookingBike?.id}
        sourceTitle={bookingBike?.name ?? ""}
      />
    </>
  );
}
