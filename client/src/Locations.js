import React, { useState, useEffect } from 'react';

export default function Locations() {
    const [allLocations, setAllLocations] = useState(null)

    useEffect(() => {
        async function fetchData() {
          const response = await fetch('https://pokeapi.co/api/v2/location');
          const locations = await response.json();
          setAllLocations(locations.results);
        }
        fetchData();
      }, []);
    
    return (
        <div>
            {allLocations && allLocations.map(location => (
                <div key={location.url}>
                    <h2>{location.name}</h2>
                    <p><button>Select location</button></p>
                </div>
            ))}
        </div>
    );
}
