import "./App.css";
import Locations from "./Locations";
import React, { useState } from "react";
import Ring from "./Ring";

function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pokemons, setPokemons] = useState();

  if (currentLocation)
    return (
      <div className="Ring">
        <Ring
          location={currentLocation}
          setCurrentLocation={setCurrentLocation}
          pokemons={pokemons}
          setPokemons={setPokemons}
        />
      </div>
    );

  return (
    <div className="Locations">
      <h1>Pokemon webapplication</h1>
      <Locations setCurrentLocation={setCurrentLocation} />
    </div>
  );
}

export default App;
