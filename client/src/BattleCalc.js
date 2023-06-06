import React, { useState, useEffect } from 'react';

function PokemonBattle({ setPokemons, myPokemonName, enemyPokemonName, pokemons }) {
    const [myPokemonData, setMyPokemonData] = useState(null);
    const [enemyPokemonData, setEnemyPokemonData] = useState(null);
    const [myPokemonHP, setMyPokemonHP] = useState(null);
    const [enemyPokemonHP, setEnemyPokemonHP] = useState(null);
    const [turn, setTurn] = useState('mine'); // You can start with 'enemy' if you like
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${myPokemonName}`)
            .then(response => response.json())
            .then(data => {
                setMyPokemonData(data);
                setMyPokemonHP(data.stats[0].base_stat); // Initial HP is max HP
            })
            .catch(err => console.error(err));
    }, [myPokemonName]);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${enemyPokemonName}`)
            .then(response => response.json())
            .then(data => {
                setEnemyPokemonData(data);
                setEnemyPokemonHP(data.stats[0].base_stat); // Initial HP is max HP
            })
            .catch(err => console.error(err));
    }, [enemyPokemonName]);

    const calculateDamage = (attackerAttack, defenderDefense) => {
        const Z = Math.random() * (255 - 217) + 217;
        return Math.floor(((((2 / 5 + 2) * attackerAttack * 60 / defenderDefense) / 50) + 2) * Z / 255);
    }

    const handleTurn = () => {
        const attacker = turn === 'mine' ? myPokemonData : enemyPokemonData;
        const defender = turn === 'mine' ? enemyPokemonData : myPokemonData;

        const attackerAttack = attacker.stats[1].base_stat;
        const defenderDefense = defender.stats[2].base_stat;

        const damage = calculateDamage(attackerAttack, defenderDefense);

        if (turn === 'mine') {
            setEnemyPokemonHP(prevHP => prevHP - damage);
        } else {
            setMyPokemonHP(prevHP => prevHP - damage);
        }

        setTurn(prevTurn => prevTurn === 'mine' ? 'enemy' : 'mine');
        }
    
    if (myPokemonData && enemyPokemonData && !winner) {
        const attacker = turn === 'mine' ? myPokemonData : enemyPokemonData;
        const defender = turn === 'mine' ? enemyPokemonData : myPokemonData;

        const attackerHP = turn === 'mine' ? myPokemonHP : enemyPokemonHP;
        const defenderHP = turn === 'mine' ? enemyPokemonHP : myPokemonHP;

    if (enemyPokemonHP <= 0) {
        setWinner(myPokemonData)
    } else if (myPokemonHP <= 0) {
        setWinner(enemyPokemonData);
    }

        return (
            <div>
                <h2>{turn === 'mine' ? `${myPokemonData.name} attacks!` : `${enemyPokemonData.name} attacks!`}</h2>
                <button onClick={handleTurn}>Next Turn</button>
                <h3>Attacker: {attacker.name} (HP: {attackerHP})</h3>
                <img src={attacker.sprites.front_default} alt="Pixel avatar" />
                {/* <img src={attacker.sprites["official-artwork"].front_default} alt="Large avatar" /> */}

                <h3>Defender: {defender.name} (HP: {defenderHP})</h3>
                <img src={defender.sprites.front_default} alt="Pixel avatar" />
                {/* <img src={defender.sprites["official-artwork"].front_default} alt="Large avatar" /> */}
            </div>
        );
    } else if (myPokemonData && enemyPokemonData && winner) {
        if (winner === myPokemonData) {
            fetch('http://localhost:3001/api/mypokemons', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(enemyPokemonData),
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error));
        }
        return (
            <div>
                <h1>{winner.name} is the winner!</h1>
                <img src={winner.sprites.front_default} alt="Pixel avatar" />
            </div>
        )
    } else {
    return <p>Loading...</p>;
    }
}

export default PokemonBattle;
