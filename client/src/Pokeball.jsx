import React, { useState } from "react";
import "./Pokeball.css";

export default function Pokeball({ enemyPokemon }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <div className={`option ${selected ? "" : "faded"}`} onClick={handleClick}>
      <div className={`pokeball ${selected ? "selected" : "unselected"}`}>
        <div className="upper-half"> </div>
        <div className="lower-half"> </div>
        <div className="base"> </div>
        <div className="inner-circle"> </div>
        <div className={`indicator ${selected ? "visible" : ""}`}> </div>
        <div className="indicator-inner"> </div>
      </div>
      {selected && <h2>{enemyPokemon.name} is captured!</h2>}
    </div>
  );
}
