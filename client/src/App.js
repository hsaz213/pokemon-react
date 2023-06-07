import "./App.css";
import Locations from "./Locations";
import React, { useState, useEffect } from "react";
import Ring from "./Ring";

function App() {
  const [currentLocation, setCurrentLocation] = useState(null);

  function handleChoose(location) {
    setCurrentLocation(location);
  }

  if (currentLocation) {
    return (
      <div className="Ring">
        <Ring location={currentLocation} onBack={() => setCurrentLocation(null)} />
      </div>
    );
  }

  return (
    <div className="Locations">
      <h1>Pokemon webapplication</h1>
      <Locations onChoose={handleChoose} />
    </div>
  );
}

export default App;
