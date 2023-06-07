const express = require("express");
const Router = express.Router();
const { readAllPokemons, addPokemon } = require("../data/pokemonModel.js");

async function getAllPokemon(req, res) {
  const data = await readAllPokemons();
  res.json(data);
}

async function addPokemonName(req, res) {
  const pokemonName = req.body;
  const resMessage = await addPokemon(pokemonName);
  res.json(resMessage);
}

Router.route("/").get(getAllPokemon).put(addPokemonName);

module.exports = Router;
