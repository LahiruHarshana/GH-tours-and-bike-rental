const places = ["Galle", "Kandy", "Ella", "Yala", "Jaffna", "Sigiriya", "Mirissa", "Arugam Bay"];

export function IslandMarquee() {
  const repeated = [...places, ...places];

  return (
    <div className="island-marquee" aria-label={`Places across Sri Lanka: ${places.join(", ")}`}>
      <div className="island-marquee__track" aria-hidden="true">
        {repeated.map((place, index) => <span key={`${place}-${index}`}>{place}<i>✦</i></span>)}
      </div>
    </div>
  );
}
