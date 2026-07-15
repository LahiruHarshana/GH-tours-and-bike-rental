const frames = [
  {
    number: "01",
    eyebrow: "Sigiriya · සීගිරිය",
    title: "Ancient stone. Early light.",
    copy: "Climb before the heat, when the rock glows amber and the forest is still waking.",
    image: "/images/sigiriya.jpg",
    alt: "Sigiriya rock fortress above the green forest at golden hour",
  },
  {
    number: "02",
    eyebrow: "Ella · ඇල්ල",
    title: "Tea air. Train windows.",
    copy: "Let the highland railway carry you through cloud, tea gardens and slow green horizons.",
    image: "/images/train-hills.jpg",
    alt: "Sri Lankan train crossing the green hills on a private island journey",
  },
  {
    number: "03",
    eyebrow: "Yala · යාල",
    title: "The road turns wild.",
    copy: "Follow dust-soft tracks into elephant country, where every quiet minute holds a surprise.",
    image: "/images/elephant.jpg",
    alt: "Elephant in Sri Lanka's wild southern landscape",
  },
  {
    number: "04",
    eyebrow: "The open road",
    title: "Move at island speed.",
    copy: "Choose two wheels, follow the palms and keep the afternoon open for unexpected turns.",
    image: "/images/bike-road.jpg",
    alt: "Motorbike ready for a ride along a quiet forest road",
  },
  {
    number: "05",
    eyebrow: "Mirissa · මිරිස්ස",
    title: "End where the sun falls.",
    copy: "Salt in the air, warm sand underfoot and nowhere else you need to be tonight.",
    image: "/images/hero-coast.jpg",
    alt: "Palm-fringed bay on Sri Lanka's southern coast at dusk",
  },
];

export function IslandStoryReel() {
  return (
    <section className="island-reel modern-section" id="island-story" data-scroll-reel aria-label="Sri Lanka in five chapters">
      <div className="island-reel__sticky">
        <div className="container island-reel__grid">
          <div className="island-reel__visual">
            <div className="island-reel__orbit" aria-hidden="true">
              <span>Stone · Tea · Wild · Road · Sea ·</span>
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
            <h2>One island.<br />Five worlds.</h2>
            <div className="island-reel__chapters">
              {frames.map((item) => (
                <article data-reel-copy key={item.number}>
                  <span>{item.number} / 05 · {item.eyebrow}</span>
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
