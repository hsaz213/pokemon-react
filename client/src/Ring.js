import "./App.css";
import React, { useState, useEffect } from "react";
import PokemonBattle from "./BattleCalc";
import Choose from "./Choose";

export default function Ring({ location, onBack, onCapture }) {
  const [areaPokemon, setAreaPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [myPokemon, setMyPokemon] = useState(null);
  const [pokemons, setPokemons] = useState(null);

  async function fethMyPokemons() {
    const rawPokemons = await fetch("http://localhost:3001/pokemons");
    const myPokemons = await rawPokemons.json();
    setPokemons(myPokemons);
  }

  useEffect(() => {
    fethMyPokemons();
  }, []);

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    async function fetchLocationPokemon() {
      setIsLoading(true);
      const rawLocation = await fetch(location.url);
      const locationData = await rawLocation.json();
      if (locationData.areas.length) {
        const randAreaUrl = locationData.areas[randomIntFromInterval(0, locationData.areas.length - 1)].url;
        const rawArea = await fetch(randAreaUrl);
        const area = await rawArea.json();
        const randPokemonUrl =
          area.pokemon_encounters[randomIntFromInterval(0, area.pokemon_encounters.length - 1)].pokemon.url;
        const randPokemonRaw = await fetch(randPokemonUrl);
        const randPokemon = await randPokemonRaw.json();
        setAreaPokemon(randPokemon);
      }
      setIsLoading(false);
    }
    fetchLocationPokemon();
  }, [location]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {areaPokemon && pokemons && (
        <div className="toggleAreaPokemonAppear">
          {!myPokemon && (
            <>
              <h2>{location.name}</h2>
              <p>A wild {areaPokemon.name} appeared!</p>
              <img src={areaPokemon.sprites.front_default} alt="Pokemon_picture" />
            </>
          )}
          {!myPokemon && <Choose pokemons={pokemons} onChoose={(pokemon) => setMyPokemon(pokemon)} />}
          {myPokemon && (
            <>
              <PokemonBattle onCapture={onCapture} myPokemon={myPokemon} enemyPokemon={areaPokemon} />
            </>
          )}
        </div>
      )}
      {!areaPokemon && (
        <div className="noEnemyPokemon">
          <h2>There is no enemy pokemon in {location.name}.</h2>
          <h3>
            Click <span>Back</span> button to choose another place!
          </h3>
        </div>
      )}
      <button className="back-btn" onClick={() => onBack()}>
        Back
      </button>
    </>
  );
}
