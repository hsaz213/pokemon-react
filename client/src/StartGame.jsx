import React from "react";

export default function StartGame({ onStart }) {
  return (
    <div className="startGame">
      <div>
        <h1 className="productName">Pokemon meg kitalaljuk</h1>
        <button className="playButton" onClick={onStart}>
          Start your adventure!
        </button>
        <h2 className="teamName">
          A Geekachu production<sup>®</sup>
        </h2>
      </div>
    </div>
  );
}
