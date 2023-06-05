import "./App.css";
import React from "react";

export default function Ring({ location, setCurrentLocation }) {
  return (
    <div>
      <h2>{location}</h2>
      <button onClick={() => setCurrentLocation(null)}>Back</button>
    </div>
  );
}
