import Image from "next/image";

type SiteLoaderPanelProps = {
  title?: string;
  message?: string;
};

export function SiteLoaderPanel({
  title = "GH Tours",
  message = "Loading your route",
}: SiteLoaderPanelProps) {
  return (
    <div className="site-loader__panel">
      <div className="site-loader__mark" aria-hidden="true">
        <Image
          src="/images/gh-tours-logo.png"
          alt=""
          width={1001}
          height={728}
          sizes="52px"
          priority
        />
      </div>
      <p>{title}</p>
      <small>{message}</small>
      <span className="site-loader__bar" aria-hidden="true">
        <i />
      </span>
    </div>
  );
}
