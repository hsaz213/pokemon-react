import React, { useState, useEffect } from "react";

function PokemonBattle({ myPokemon, enemyPokemon, pokemons }) {
  const [myPokemonHP, setMyPokemonHP] = useState(myPokemon.stats[0].base_stat);
  const [enemyPokemonHP, setEnemyPokemonHP] = useState(enemyPokemon.stats[0].base_stat);
  const [turn, setTurn] = useState("mine");
  const [winner, setWinner] = useState(null);
  const [isCaptured, setIsCaptured] = useState(false);

  const calculateDamage = (attackerAttack, defenderDefense) => {
    const Z = Math.random() * (255 - 217) + 217;
    return Math.floor(((((2 / 5 + 2) * attackerAttack * 60) / defenderDefense / 50 + 2) * Z) / 255);
  };

  const handleTurn = () => {
    const attacker = turn === "mine" ? myPokemon : enemyPokemon;
    const defender = turn === "mine" ? enemyPokemon : myPokemon;

    const attackerAttack = attacker.stats[1].base_stat;
    const defenderDefense = defender.stats[2].base_stat;

    const damage = calculateDamage(attackerAttack, defenderDefense);

    if (turn === "mine") {
      setEnemyPokemonHP((prevHP) => prevHP - damage);
    } else {
      setMyPokemonHP((prevHP) => prevHP - damage);
    }

    setTurn((prevTurn) => (prevTurn === "mine" ? "enemy" : "mine"));
  };

  function handleClick() {
    console.log(enemyPokemon);
    fetch("http://localhost:3001/pokemons", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: enemyPokemon.name }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => console.log(error));
  }

  if (myPokemon && enemyPokemon && !winner) {
    const attacker = turn === "mine" ? myPokemon : enemyPokemon;
    const defender = turn === "mine" ? enemyPokemon : myPokemon;

    const attackerHP = turn === "mine" ? myPokemonHP : enemyPokemonHP;
    const defenderHP = turn === "mine" ? enemyPokemonHP : myPokemonHP;

    if (enemyPokemonHP <= 0 && !isCaptured) {
      setIsCaptured(true);
      setWinner(myPokemon);
    } else if (myPokemonHP <= 0) {
      setWinner(enemyPokemon);
    }

    return (
      <div>
        <h2>{turn === "mine" ? `${myPokemon.name} attacks!` : `${enemyPokemon.name} attacks!`}</h2>
        <button onClick={handleTurn}>Next Turn</button>
        <h3>
          Attacker: {attacker.name} (HP: {attackerHP})
        </h3>
        <img src={attacker.sprites.front_default} alt="Pixel avatar" />
        {/* <img src={attacker.sprites["official-artwork"].front_default} alt="Large avatar" /> */}

        <h3>
          Defender: {defender.name} (HP: {defenderHP})
        </h3>
        <img src={defender.sprites.front_default} alt="Pixel avatar" />
        {/* <img src={defender.sprites["official-artwork"].front_default} alt="Large avatar" /> */}
      </div>
    );
  } else if (myPokemon && enemyPokemon && winner) {
    return (
      <>
        <div>
          <h1>{winner.name} is the winner!</h1>
          <img src={winner.sprites.front_default} alt="Pixel avatar" />
        </div>
        {winner === myPokemon && <button onClick={handleClick}>Add to the collection!</button>}
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default PokemonBattle;
