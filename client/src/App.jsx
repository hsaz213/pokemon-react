import "./App.css";
import Locations from "./Locations";
import React, { useState } from "react";
import Ring from "./Ring";

function App() {
  const [currentLocation, setCurrentLocation] = useState(null);

  function handleChoose(location) {
      setCurrentLocation(location);
  }

  console.log(currentLocation);
  
  function handleCapture() {
    setTimeout(() => setCurrentLocation(null), 2500);
  }

  if (currentLocation) {
    return (
      <div className="Ring">
        <Ring onCapture={handleCapture} onChoose={handleChoose} location={currentLocation} onBack={() => setCurrentLocation(null)} />
      </div>
    );
  }

  return (
    <div className="Locations">
      {/* <h1>Pokemon webapplication</h1> */}
      <Locations onChoose={handleChoose} />
    </div>
  );
}

export default App;
