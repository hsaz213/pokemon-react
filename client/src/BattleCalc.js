import React, { useState, useEffect } from 'react';

function PokemonBattle({ pokemonName }) {
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => response.json())
            .then(data => setPokemonData(data))
            .catch(err => console.error(err));
    }, [pokemonName]);

    const calculateDamage = (attackerAttack, defenderDefense) => {
        const Z = Math.random() * (255 - 217) + 217;
        return ((((2 / 5 + 2) * attackerAttack * 60 / defenderDefense) / 50) + 2) * Z / 255;
    }

    if (pokemonData) {
        const hp = pokemonData.stats[0].base_stat;
        const attack = pokemonData.stats[1].base_stat;
        const defense = pokemonData.stats[2].base_stat;

        const damage = calculateDamage(attack, defense);

        return (
            <div>
                <h2>{pokemonData.name}</h2>
                <img src={pokemonData.sprites.front_default} alt="Pixel avatar" />
                <img src={pokemonData.sprites["official-artwork"].front_default} alt="Large avatar" />
                <p>HP: {hp}</p>
                <p>Attack: {attack}</p>
                <p>Defense: {defense}</p>
                <p>Damage: {damage}</p>
            </div>
        );
    } else {
        return <p>Loading...</p>;
    }
}

export default BattleCalc;
