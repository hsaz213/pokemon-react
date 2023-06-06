import React, { useState, useEffect } from 'react';

function PokemonBattle({ myPokemonName, enemyPokemonName }) {
    const [myPokemonData, setMyPokemonData] = useState(null);
    const [enemyPokemonData, setEnemyPokemonData] = useState(null);
    const [turn, setTurn] = useState('mine');

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${myPokemonName}`)
            .then(response => response.json())
            .then(data => setMyPokemonData(data))
            .catch(err => console.error(err));
    }, [myPokemonName]);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${enemyPokemonName}`)
            .then(response => response.json())
            .then(data => setEnemyPokemonData(data))
            .catch(err => console.error(err));
    }, [enemyPokemonName]);

    const calculateDamage = (attackerAttack, defenderDefense) => {
        const Z = Math.random() * (255 - 217) + 217;
        return ((((2 / 5 + 2) * attackerAttack * 60 / defenderDefense) / 50) + 2) * Z / 255;
    }

    const handleTurn = () => {
        setTurn(prevTurn => prevTurn === 'mine' ? 'enemy' : 'mine');
    }

    if (myPokemonData && enemyPokemonData) {
        const attacker = turn === 'mine' ? myPokemonData : enemyPokemonData;
        const defender = turn === 'mine' ? enemyPokemonData : myPokemonData;

        const attackerAttack = attacker.stats[1].base_stat;
        const defenderDefense = defender.stats[2].base_stat;

        const damage = calculateDamage(attackerAttack, defenderDefense);

        return (
            <div>
                <h2>{turn === 'mine' ? `${myPokemonData.name} attacks!` : `${enemyPokemonData.name} attacks!`}</h2>
                <button onClick={handleTurn}>Next Turn</button>
                <h3>Attacker: {attacker.name}</h3>
                <img src={attacker.sprites.front_default} alt="Pixel avatar" />
                <img src={attacker.sprites["official-artwork"].front_default} alt="Large avatar" />
                <p>Attack: {attackerAttack}</p>

                <h3>Defender: {defender.name}</h3>
                <img src={defender.sprites.front_default} alt="Pixel avatar" />
                <img src={defender.sprites["official-artwork"].front_default} alt="Large avatar" />
                <p>Defense: {defenderDefense}</p>

                <p>Damage: {damage}</p>
            </div>
        );
    } else {
        return <p>Loading...</p>;
    }
}

export default PokemonBattle;
