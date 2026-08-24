"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signatureDestinations } from "@/lib/signature-destinations";
import { SignatureJourneyImage } from "@/components/public/collections/SignatureJourneyImage";

const frames = signatureDestinations;

export function SignatureJourneysReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
        ".story-reel__image .signature-journey-picture__img, .story-reel__image img",
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
      const index = Math.round(progress * (frames.length - 1));
      setActiveIndex((current) => (current === index ? current : index));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

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
    const target = top + (index / (frames.length - 1)) * height;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className={isReady ? "story-reel ss-signature-reel story-reel--ready" : "story-reel ss-signature-reel"}
      data-scroll-reel
      data-chapter="01 / SIGNATURE JOURNEYS"
      aria-labelledby="signature-journeys-reel-heading"
    >
      <h2 id="signature-journeys-reel-heading" className="visually-hidden">
        Signature Sri Lanka destinations for custom journeys
      </h2>

      <div className="story-reel__sticky">
        <div className="story-reel__stage">
          <div className="story-reel__chrome" aria-hidden="true">
            <span className="story-reel__chrome-label">
              <i />
              {frames[activeIndex]?.name ?? "Signature journeys"} · {frames[activeIndex]?.region}
            </span>
            <span className="story-reel__chrome-count">
              {String(activeIndex + 1).padStart(2, "0")} <i /> {String(frames.length).padStart(2, "0")}
            </span>
          </div>

          <div className="story-reel__orbit" aria-hidden="true">
            <span>Ella · Kandy · Coast · Wild · Forest · East ·</span>
          </div>

          <div className="story-reel__frames">
            {frames.map((item, index) => (
              <figure
                data-reel-frame
                key={item.slug}
                className="story-reel__frame"
                style={{ zIndex: frames.length - index }}
              >
                <div className="story-reel__image">
                  <SignatureJourneyImage
                    desktopSrc={item.image}
                    mobileSrc={item.mobileImage}
                    alt={item.alt}
                    priority={index < 2}
                  />
                </div>
                <div className="story-reel__number" aria-hidden="true">
                  {item.number}
                </div>
              </figure>
            ))}
          </div>

          <div className="story-reel__content-layer">
            {frames.map((item) => (
              <article data-reel-copy key={item.slug} className="story-reel__copy">
                <Link
                  href={`/custom-tour?destination=${encodeURIComponent(item.name)}`}
                  className="story-reel__copy-card ss-signature-reel__card"
                >
                  <div className="story-reel__place">
                    <span className="story-reel__place-en">{item.name}</span>
                    <span className="story-reel__place-si" lang="si">
                      {item.sinhala}
                    </span>
                    <span className="ss-signature-reel__region">{item.region}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <span className="story-reel__card-mark">
                    Add to my journey <i>↗</i>
                  </span>
                </Link>
              </article>
            ))}
          </div>

          <nav className="story-reel__timeline ss-signature-reel__timeline" aria-label="Destination chapters">
            {frames.map((chapter, index) => (
              <button
                key={chapter.slug}
                type="button"
                className="story-reel__timeline-button ss-signature-reel__timeline-button"
                aria-label={`Jump to ${chapter.name}`}
                aria-current={activeIndex === index ? "step" : undefined}
                onClick={() => jumpTo(index)}
              >
                <span className="ss-signature-reel__timeline-no" aria-hidden="true">{chapter.number}</span>
                <span className="ss-signature-reel__timeline-name">{chapter.name}</span>
              </button>
            ))}
          </nav>

          <Link href="/custom-tour" className="ss-signature-reel__cta">
            Design your custom journey
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
