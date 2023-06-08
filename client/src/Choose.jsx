import React, { useEffect, useState } from "react";
import './Choose.css'

export default function Choose({ pokemons: pokemonUrls, onChoose }) {
  const [pokemonData, setPokemonData] = useState([]);
  console.log(pokemonUrls, "pokemonurls");
  async function getPokemonData() {
    const pokemon = [];
    for (const pokemonUrl of pokemonUrls.pokemonNames) {
      const response = await fetch(pokemonUrl);
      const pokemonData = await response.json();
      pokemon.push(pokemonData);
    }
    return pokemon;
  }
  useEffect(() => {
    async function operation() {
      setPokemonData(await getPokemonData());
    }
    operation();
  }, []);

  if (pokemonData) {
    return (
      <>
        <h2>Choose your pokemon!</h2>
        <div className='pokemon-choice-container'>
          {pokemonData.map((pokemon, index) => (
            <div className='pokemon-choice'
              key={index}
              onClick={() => onChoose(pokemon)}>
              <div className='pokemon-choice'>
                <img src={pokemon.sprites.front_default} alt="Pixel avatar" />
                <p>{pokemon.name}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
