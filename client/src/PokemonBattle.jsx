import React, { useState } from "react";
import Pokeball from "./Pokeball";

function PokemonBattle({ myPokemon, enemyPokemon, onCapture, locationImg }) {
  const [myPokemonHP, setMyPokemonHP] = useState(myPokemon.stats[0].base_stat);
  const [enemyPokemonHP, setEnemyPokemonHP] = useState(enemyPokemon.stats[0].base_stat);
  const [turn, setTurn] = useState("mine");
  const [winner, setWinner] = useState(null);

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
    onCapture();
  }

  if (!winner) {
    const attacker = turn === "mine" ? myPokemon : enemyPokemon;
    const defender = turn === "mine" ? enemyPokemon : myPokemon;

    const attackerHP = turn === "mine" ? myPokemonHP : enemyPokemonHP;
    const defenderHP = turn === "mine" ? enemyPokemonHP : myPokemonHP;

    if (enemyPokemonHP <= 0) {
      setWinner(myPokemon);
    } else if (myPokemonHP <= 0) {
      setWinner(enemyPokemon);
    }

    return (
      // attack turns
      <>
      <div className="battleField" style={{ backgroundImage: `url(${locationImg})`, backgroundSize: 'cover' }}>

        {/* <h1>Fight</h1> */}
        <h2>{turn === "mine" ? `${myPokemon.name} attacks!` : `${enemyPokemon.name} attacks!`}</h2>
        <h3>
          Attacker: {attacker.name} (HP: {attackerHP})
        </h3>
        <img src={attacker.sprites.front_default} alt="Pixel avatar" />

        <h3>
          Defender: {defender.name} (HP: {defenderHP})
        </h3>
        <img src={defender.sprites.front_default} alt="Pixel avatar" />
      </div>
        <button className='next-btn' onClick={handleTurn}>Next Turn</button></>
    );
    // match over, player win
  } else if (winner === myPokemon) {
    return (
      <>
        <div className="won">
          <img src={enemyPokemon.sprites.front_default} alt="Pokemon_picture" className="beBigger" />
          <h1>{winner.name} is the winner!</h1>
          <h2>Use the Pokeball to catch {enemyPokemon.name}</h2>
          <p className="pokeBallP" onClick={handleClick}>
            <Pokeball enemyPokemon={enemyPokemon} />
          </p>
        </div>
      </>
    );
    // match over, wild pokemon win
  } else if (myPokemon && enemyPokemon && winner === enemyPokemon) {
    return (
      <>
        <div>
          <h1>{winner.name} wins!</h1>

          <h2>Click the Back button to continue your adventure.</h2>
          {/* <img src={winner.sprites.front_default} alt="Pixel avatar" /> */}
        </div>
        {/* {winner === enemyPokemon && <button onClick={handleClick}>Add to the collection!</button>} */}
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default PokemonBattle;
