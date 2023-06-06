const express = require("express");
const path = require("path");
const app = express();
const pokemons = require("./routes/pokemon.js");

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/pokemons", pokemons);

app.listen(3001, () => console.log("Server is listening on port 3001"));
