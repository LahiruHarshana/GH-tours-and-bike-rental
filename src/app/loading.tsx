import Image from "next/image";

export default function Loading() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="page-loader__sun" aria-hidden="true">
        <Image
          src="/android-chrome-192x192.png"
          alt=""
          width={192}
          height={192}
          sizes="72px"
        />
      </div>
      <p>Opening the island</p>
      <small>Please wait a moment</small>
    </div>
  );
}
