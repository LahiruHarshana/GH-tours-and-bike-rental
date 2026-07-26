"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const frames = [
  {
    number: "01",
    eyebrow: "Sigiriya · සීගිරිය",
    title: "Ancient stone. Early light.",
    copy: "Climb before the heat, when the rock glows amber and the forest is still waking.",
    image: "/images/sigiriya.webp",
    alt: "Sigiriya rock fortress above the green forest at golden hour",
  },
  {
    number: "02",
    eyebrow: "Ella · ඇල්ල",
    title: "Tea air. Train windows.",
    copy: "Let the highland railway carry you through cloud, tea gardens and slow green horizons.",
    image: "/images/train-hills.webp",
    alt: "Sri Lankan train crossing the green hills on a private island journey",
  },
  {
    number: "03",
    eyebrow: "Yala · යාල",
    title: "The road turns wild.",
    copy: "Follow dust-soft tracks into elephant country, where every quiet minute holds a surprise.",
    image: "/images/elephant.webp",
    alt: "Elephant in Sri Lanka's wild southern landscape",
  },
  {
    number: "04",
    eyebrow: "The open road",
    title: "Move at island speed.",
    copy: "Choose two wheels, follow the palms and keep the afternoon open for unexpected turns.",
    image: "/images/bike-road.webp",
    alt: "Motorbike ready for a ride along a quiet forest road",
  },
  {
    number: "05",
    eyebrow: "Mirissa · මිරිස්ස",
    title: "End where the sun falls.",
    copy: "Salt in the air, warm sand underfoot and nowhere else you need to be tonight.",
    image: "/images/hero-coast.webp",
    alt: "Palm-fringed bay on Sri Lanka's southern coast at dusk",
  },
];

export function IslandStoryReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle readiness and reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let isCancelled = false;
    // Delay slightly to avoid synchronous setState inside useEffect warning
    setTimeout(() => {
      if (!isCancelled && mediaQuery.matches) {
        setReducedMotion(true);
      }
    }, 0);

    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", onChange);

    if (mediaQuery.matches) {
      setTimeout(() => setIsReady(true), 0);
      return () => mediaQuery.removeEventListener("change", onChange);
    }

    if (!sectionRef.current) return () => mediaQuery.removeEventListener("change", onChange);

    const imgs = Array.from(sectionRef.current.querySelectorAll<HTMLImageElement>(".story-reel__image img"));

    // We only wait for decode if the browser supports it
    Promise.allSettled(
      imgs.map((img) => {
        if (img.complete) return Promise.resolve();
        return img.decode ? img.decode().catch(() => {}) : new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    ).then(() => {
      if (!isCancelled) setIsReady(true);
    });

    return () => {
      isCancelled = true;
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  // Sync active index for timeline (since timeline is interactive and needs aria-current)
  useEffect(() => {
    if (reducedMotion) return;

    const onScroll = () => {
      if (!sectionRef.current) return;
      const progressStr = sectionRef.current.style.getPropertyValue("--reel-progress");
      if (progressStr) {
        const progress = parseFloat(progressStr);
        const index = Math.round(progress * (frames.length - 1));
        if (index !== activeIndex) {
          setActiveIndex(index);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion, activeIndex]);

  const jumpTo = (index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const top = window.scrollY + rect.top;

    if (reducedMotion) {
      // In reduced motion, they are just normal blocks. We can scroll to the specific article.
      const articles = sectionRef.current.querySelectorAll("article");
      const targetArticle = articles[index];
      if (targetArticle) {
        const articleRect = targetArticle.getBoundingClientRect();
        window.scrollTo({
          top: window.scrollY + articleRect.top - 100, // offset for header
          behavior: "auto"
        });
      }
      return;
    }

    // Desktop sticky scroll calculation
    const height = rect.height - window.innerHeight;
    const target = top + (index / (frames.length - 1)) * height;
    window.scrollTo({
      top: target,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="island-story"
      ref={sectionRef}
      className={isReady ? "story-reel story-reel--ready" : "story-reel"}
      data-scroll-reel
      data-chapter="02 / ISLAND STORY"
      aria-labelledby="story-reel-heading"
    >
      <h2 id="story-reel-heading" className="visually-hidden">
        Journey through Sri Lanka
      </h2>

      <div className="story-reel__sticky">
        <div className="story-reel__stage">
          <div className="story-reel__chrome" aria-hidden="true">
            <span className="story-reel__chrome-label"><i />The island in five movements</span>
            <span className="story-reel__chrome-count">
              {String(activeIndex + 1).padStart(2, "0")} <i /> {String(frames.length).padStart(2, "0")}
            </span>
          </div>

          <div className="story-reel__orbit" aria-hidden="true">
            <span>Stone · Tea · Wild · Road · Sea ·</span>
          </div>

          <div className="story-reel__frames">
            {frames.map((item, index) => (
              <figure data-reel-frame key={item.number} className="story-reel__frame" style={{ zIndex: frames.length - index }}>
                <div className="story-reel__image">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={1920}
                    height={1280}
                    sizes="(max-width: 1024px) 100vw, 100vw"
                    priority={index === 0}
                  />
                </div>
                {/* Visual number behind the text */}
                <div className="story-reel__number" aria-hidden="true">{item.number}</div>
              </figure>
            ))}
          </div>

          <div className="story-reel__content-layer">
            {frames.map((item) => (
              <article data-reel-copy key={item.number} className="story-reel__copy">
                <div className="story-reel__copy-card">
                  <div className="story-reel__place">
                    {item.eyebrow.includes("·") ? (
                      <>
                        <span className="story-reel__place-en">{item.eyebrow.split("·")[0].trim()}</span>
                        <span className="story-reel__place-si" lang="si">{item.eyebrow.split("·")[1].trim()}</span>
                      </>
                    ) : (
                      <span className="story-reel__place-en">{item.eyebrow}</span>
                    )}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <span className="story-reel__card-mark" aria-hidden="true">Explore slowly <i>↗</i></span>
                </div>
              </article>
            ))}
          </div>

          <nav className="story-reel__timeline" aria-label="Story chapters">
            {frames.map((chapter, index) => (
              <button
                key={chapter.number}
                type="button"
                className="story-reel__timeline-button"
                aria-label={"Jump to " + chapter.title}
                aria-current={activeIndex === index ? "step" : undefined}
                onClick={() => jumpTo(index)}
              >
                <span aria-hidden="true">{chapter.number}</span>
                <span className="visually-hidden">{chapter.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
