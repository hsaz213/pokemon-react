import "./App.css";
import React, { useState, useEffect } from "react";

export default function Ring({ location, setCurrentLocation }) {
  const [areaPokemon, setAreaPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function fetchLocationPokemon(url, setter) {
    setIsLoading(true);
    const rawLocation = await fetch(url);
    const location = await rawLocation.json();
    if (location.areas.length) {
      const randAreaUrl = location.areas[randomIntFromInterval(0, location.areas.length - 1)].url;
      const rawArea = await fetch(randAreaUrl);
      const area = await rawArea.json();
      const randPokemonUrl =
        area.pokemon_encounters[randomIntFromInterval(0, area.pokemon_encounters.length - 1)].pokemon.url;
      const randPokemonRaw = await fetch(randPokemonUrl);
      const randPokemon = await randPokemonRaw.json();
      setter(randPokemon);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchLocationPokemon(location.url, setAreaPokemon);
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  } else {
    console.log(areaPokemon);
  }

  return (
    <>
      {areaPokemon && (
        <div>
          <h2>{location.name}</h2>
          <p>Your opponent is: {areaPokemon.name}</p>
          <img src={areaPokemon.sprites.front_default} alt="Pokemon_picture" />
        </div>
      )}
      {!areaPokemon && <div>There is no enemy pokemon in {location.name}.</div>}
      <button onClick={() => setCurrentLocation(null)}>Back</button>
    </>
  );
}
