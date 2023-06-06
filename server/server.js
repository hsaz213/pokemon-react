const express = require("express");
const path = require("path");
const app = express();
const pokemons = require("./routes/pokemon.js");
const { addPokemon } = require("./data/pokemonModel.js");

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.put('/api/mypokemons', async (req, res) => {
  try {
    const capturedPokemon = await req.body;
    addPokemon(capturedPokemon);
    res.status(200).send(`${capturedPokemon} captured`);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
});

app.use("/pokemons", pokemons);

app.listen(3001, () => console.log("Server is listening on port 3001"));
