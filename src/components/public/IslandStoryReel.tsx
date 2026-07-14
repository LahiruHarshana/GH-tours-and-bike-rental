const frames = [
  {
    number: "01",
    eyebrow: "Arrive",
    title: "Land softly.",
    copy: "A named driver, a tracked flight and a calm first road from the airport.",
    image: "/images/hero-coast.jpg",
    alt: "Palm-fringed Sri Lankan coast at the beginning of a private journey",
  },
  {
    number: "02",
    eyebrow: "Explore",
    title: "Go deeper.",
    copy: "Private journeys shaped around culture, food, wild landscapes and your own pace.",
    image: "/images/train-hills.jpg",
    alt: "Sri Lankan train crossing the green hills on a private island journey",
  },
  {
    number: "03",
    eyebrow: "Ride",
    title: "Move freely.",
    copy: "Reliable bikes, honest guidance and local support wherever the road turns.",
    image: "/images/bike-road.jpg",
    alt: "Motorbike ready for a ride along a quiet forest road",
  },
];

export function IslandStoryReel() {
  return (
    <section className="island-reel modern-section" data-scroll-reel aria-label="The GH journey in three chapters">
      <div className="island-reel__sticky">
        <div className="container island-reel__grid">
          <div className="island-reel__visual">
            <div className="island-reel__orbit" aria-hidden="true">
              <span>Arrive · Explore · Ride ·</span>
              <i /><b />
            </div>
            <div className="island-reel__frames">
              {frames.map((item) => (
                <figure data-reel-frame key={item.number}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.alt} />
                  <figcaption><span>{item.number}</span>{item.eyebrow}</figcaption>
                </figure>
              ))}
            </div>
            <span className="island-reel__frame-mark" aria-hidden="true">GH / Sri Lanka</span>
          </div>

          <div className="island-reel__story">
            <span className="eyebrow eyebrow--light"><i />Scroll the journey</span>
            <h2>One island.<br />Three ways to feel it.</h2>
            <div className="island-reel__chapters">
              {frames.map((item) => (
                <article data-reel-copy key={item.number}>
                  <span>{item.number} / 03</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
            <div className="island-reel__timeline" aria-hidden="true">
              {frames.map((item) => <i key={item.number} />)}
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
