import React, { useState, useEffect } from "react";

export default function Locations({ setCurrentLocation }) {
  const [allLocations, setAllLocations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData(url, setter) {
    setIsLoading(true);
    const response = await fetch(url);
    const locations = await response.json();
    setIsLoading(false);
    setter(locations.results);
  }

  useEffect(() => {
    fetchData("https://pokeapi.co/api/v2/location", setAllLocations);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Choose location!</h2>
      {allLocations &&
        allLocations.map((location) => (
          <div key={location.url}>
            <h2>{location.name}</h2>
            <p>
              <button onClick={() => setCurrentLocation({ name: location.name, url: location.url })}>
                Select location
              </button>
            </p>
          </div>
        ))}
    </div>
  );
}
