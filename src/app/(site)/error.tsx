"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="ss-state-page ss-state-page--error" aria-labelledby="site-error-title">
      <div className="ss-state-page__number" aria-hidden="true">!</div>
      <div className="ss-state-page__card">
        <span>A small pause on the road</span>
        <h1 id="site-error-title">We could not open this page.</h1>
        <p>Please try once more. If the problem continues, our local team can still help you plan by phone, WhatsApp or email.</p>
        <div>
          <button className="button button--gold" type="button" onClick={reset}>Try again</button>
          <Link className="button button--dark" href="/contact">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
