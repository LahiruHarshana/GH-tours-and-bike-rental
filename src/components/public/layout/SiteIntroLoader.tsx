"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

export const SITE_INTRO_STORAGE_KEY = "gh-site-intro-complete";

const MIN_VISIBLE_MS = 2400;
const EXIT_MS = 820;
const MAX_WAIT_MS = 5200;

type IntroPhase = "idle" | "active" | "exit" | "done";

function clearIntroPending() {
  document.documentElement.classList.remove("site-intro-pending");
}

export function SiteIntroLoader() {
  const [phase, setPhase] = useState<IntroPhase>(() => {
    if (typeof window === "undefined") return "idle";
    try {
      return sessionStorage.getItem(SITE_INTRO_STORAGE_KEY) ? "done" : "active";
    } catch {
      return "done";
    }
  });
  const [progress, setProgress] = useState(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let progressFrame = 0;
    let exitTimer = 0;
    let maxTimer = 0;
    let loadTimer = 0;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minVisible = reducedMotion ? 700 : MIN_VISIBLE_MS;
    const exitDuration = reducedMotion ? 320 : EXIT_MS;

    const finish = () => {
      if (finishedRef.current || cancelled) return;
      finishedRef.current = true;
      window.clearTimeout(maxTimer);
      window.clearTimeout(loadTimer);

      setProgress(100);
      setPhase("exit");

      try {
        sessionStorage.setItem(SITE_INTRO_STORAGE_KEY, "1");
      } catch {
        // Ignore storage failures in private browsing.
      }

      exitTimer = window.setTimeout(() => {
        clearIntroPending();
        setPhase("done");
      }, exitDuration);
    };

    try {
      if (sessionStorage.getItem(SITE_INTRO_STORAGE_KEY)) {
        clearIntroPending();
        setPhase("done");
        return () => {
          cancelled = true;
        };
      }
    } catch {
      clearIntroPending();
      setPhase("done");
      return () => {
        cancelled = true;
      };
    }

    document.documentElement.classList.add("site-intro-pending");

    const startedAt = performance.now();

    const updateProgress = (now: number) => {
      const elapsed = now - startedAt;
      const next = Math.min(96, Math.round((elapsed / minVisible) * 96));
      setProgress((current) => (current === next ? current : next));
      if (!finishedRef.current) {
        progressFrame = window.requestAnimationFrame(updateProgress);
      }
    };

    progressFrame = window.requestAnimationFrame(updateProgress);

    const scheduleFinish = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, minVisible - elapsed);
      loadTimer = window.setTimeout(finish, remaining);
    };

    if (document.readyState === "complete") {
      scheduleFinish();
    } else {
      window.addEventListener("load", scheduleFinish, { once: true });
    }

    maxTimer = window.setTimeout(finish, MAX_WAIT_MS);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(progressFrame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(maxTimer);
      window.clearTimeout(loadTimer);
      window.removeEventListener("load", scheduleFinish);
    };
  }, []);

  if (phase === "idle" || phase === "done") return null;

  return (
    <div
      className={`site-intro${phase === "exit" ? " site-intro--exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={phase === "active"}
      aria-label="Loading GH Tours"
    >
      <div className="site-intro__backdrop" aria-hidden="true">
        <span className="site-intro__glow site-intro__glow--one" />
        <span className="site-intro__glow site-intro__glow--two" />
        <span className="site-intro__grain" />
        <span className="site-intro__line site-intro__line--one" />
        <span className="site-intro__line site-intro__line--two" />
      </div>

      <div className="site-intro__content">
        <div className="site-intro__logo-ring">
          <Image
            src="/images/gh-tours-logo.png"
            alt=""
            width={1001}
            height={728}
            sizes="88px"
            priority
          />
        </div>

        <p className="site-intro__brand">{siteConfig.shortName}</p>
        <p className="site-intro__tagline">{siteConfig.tagline}</p>

        <div className="site-intro__progress" aria-hidden="true">
          <span className="site-intro__progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <p className="site-intro__status">
          Preparing your journey
          <span>{progress}%</span>
        </p>

        <p className="site-intro__location">Sri Lanka</p>
      </div>
    </div>
  );
}
