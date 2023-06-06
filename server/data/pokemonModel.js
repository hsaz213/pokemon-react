const path = require("path");
const fsPromises = require("fs").promises;

async function readAllPokemons() {
  const rawPokemons = await fsPromises.readFile(path.join(__dirname, "myPokemons.json"), "utf-8");
  const pokemons = JSON.parse(rawPokemons);
  return pokemons;
}

async function addPokemon(pokemonName) {
  try {
    const pokemons = await readAllPokemons();
    console.log("itt meg okes", pokemons);
    pokemons.pokemonNames.push(pokemonName.name);
    console.log(pokemons);
    fsPromises.writeFile(path.join(__dirname, "myPokemons.json"), JSON.stringify(pokemons, null, 2));
    return { message: `${pokemonName.name} added to the collection.` };
  } catch (error) {
    return { message: `Failed to add ${pokemonName.name} to the collection.` };
  }
}

module.exports = { readAllPokemons, addPokemon };
