import React, { useEffect, useState } from "react";

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
      <div>
        <h2>Choose your pokemon!</h2>
        {pokemonData.map((pokemon, index) => (
          <button key={index} onClick={() => onChoose(pokemon)}>
            {pokemon.name}
          </button>
        ))}
      </div>
    );
  }
}
