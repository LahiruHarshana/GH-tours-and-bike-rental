import { AIRPORT_DESTINATIONS, AIRPORT_TAXI_TYPES } from "@/lib/airport-vehicles";
import { formatLKR } from "@/lib/utils";

export function AirportFareTable() {
  return (
    <div className="airport-fare-table-wrap">
      <div className="admin-table-wrap">
        <table className="airport-fare-table">
          <caption>Private CMB airport transfer fares in Sri Lankan rupees</caption>
          <thead>
            <tr>
              <th>Destination</th>
              <th>Travel time</th>
              {AIRPORT_TAXI_TYPES.map((taxi) => (
                <th key={taxi.id}>{taxi.emoji} {taxi.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AIRPORT_DESTINATIONS.map((place) => (
              <tr key={place.id} id={`fare-${place.id}`}>
                <th scope="row">
                  <strong>{place.name}</strong>
                  <small>{place.region}{place.covers?.length ? ` · also ${place.covers.join(", ")}` : ""}</small>
                </th>
                <td>{place.duration}</td>
                {AIRPORT_TAXI_TYPES.map((taxi) => (
                  <td key={taxi.id}>{formatLKR(place.fares[taxi.id])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Fares are for a private transfer from Bandaranaike International Airport to the listed town. Add your hotel or villa name when you book. Extra stops, midnight pickups and waiting time are confirmed on WhatsApp if needed.</p>
    </div>
  );
}
