import "./App.css";
import Locations from "./Locations";
import React, { useState } from "react";
import Ring from "./Ring";
import StartGame from "./StartGame";

function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function handleChoose(location) {
    setCurrentLocation(location);
  }

  if (!isPlaying) return <StartGame onStart={() => setIsPlaying(true)} />;

  if (currentLocation) {
    return (
      <div className="Ring">
        <Ring location={currentLocation} onBack={() => setCurrentLocation(null)} />
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
