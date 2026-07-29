import Link from "next/link";
import { PublicFooter } from "@/components/public/navigation/PublicFooter";
import { PublicHeader } from "@/components/public/navigation/PublicHeader";
import { getWebsiteContent } from "@/lib/data";

export default async function NotFound() {
  const content = await getWebsiteContent();
  return (
    <>
      <PublicHeader content={content.global} />
      <main id="main-content" className="ss-state-page">
        <div className="ss-state-page__number" aria-hidden="true">404</div>
        <div className="ss-state-page__card">
          <span>Wrong turn, lovely view</span>
          <h1>This road does not continue.</h1>
          <p>The page may have moved, or the address may be incomplete. Head back to the island overview or explore our private journeys.</p>
          <div>
            <Link className="button button--dark" href="/">Return home</Link>
            <Link className="button button--gold" href="/tours">Explore tours</Link>
          </div>
        </div>
      </main>
      <PublicFooter content={content.global} />
    </>
  );
}
