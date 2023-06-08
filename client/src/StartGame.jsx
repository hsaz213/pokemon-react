import React from "react";
import gigachu from "./img/start.png";

export default function StartGame({ onStart }) {
  return (
    <div className="startGame">
      <div>
        <h1 className="productName">
          Pokemon Annihilator 3000<sup>®</sup>
        </h1>
        <button className="playButton" onClick={onStart}>
          Start your adventure!
        </button>
        <h3 className="teamName">
          A Geekachu<sup>™</sup> production
        </h3>
        <img src={gigachu} className="gigachu" alt="Gigachu" />
      </div>
    </div>
  );
}
