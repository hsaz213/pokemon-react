import React, { useState, useEffect } from "react";
import './Locations.css'

import canalaveCity from './img/HGSS_Seafoam_Islands-Day.png';
import eternaCity from './img/HGSS_Ilex_Forest-Day.png';
import pastoriaCity from './img/HGSS_Victory_Road-Day.png';
import sunyshoreCity from './img/HGSS_Ruins_of_Alph-Day.png';
import sinnohPokemonLeague from './img/HGSS_National_Park-Day.png';
import oreburghMine from './img/HGSS_Mt._Mortar-Day.png';
import valleyWindworks from './img/HGSS_Union_Cave-Day.png';
import eternaForest from './img/HGSS_Ilex_Forest-Day.png';
import fuegoIronworks from './img/HGSS_Bell_Tower-Day.png';
import mtCoronet from './img/HGSS_Mt._Silver-Day.png';
import greatMarsh from './img/HGSS_Slowpoke_Well-Day.png';
import solaceonRuins from './img/HGSS_Ruins_of_Alph-Day.png';
import sinnohVictoryRoad from './img/HGSS_Victory_Road-Day.png';
import ravagedPath from './img/HGSS_Dark_Cave-Route_31-Day.png';
import orehurghGate from './img/HGSS_Union_Cave-Day.png';
import starkMountain from './img/HGSS_Mt._Silver-Day.png';
import springPath from './img/HGSS_Sprout_Tower-Day.png';
import turnbackCave from './img/HGSS_Rock_Tunnel-Day.png';
import snowpointTemple from './img/HGSS_Ice_Cave-Day.png';
import waywardCave from './img/HGSS_Dark_Cave-Route_45-Day.png';

const locationImages = {
  'canalave-city': canalaveCity,
  'eterna-city': eternaCity,
  'pastoria-city': pastoriaCity,
  'sunyshore-city': sunyshoreCity,
  'sinnoh-pokemon-league': sinnohPokemonLeague,
  'oreburgh-mine': oreburghMine,
  'valley-windworks': valleyWindworks,
  'eterna-forest': eternaForest,
  'fuego-ironworks': fuegoIronworks,
  'mt-coronet': mtCoronet,
  'great-marsh': greatMarsh,
  'solaceon-ruins': solaceonRuins,
  'sinnoh-victory-road': sinnohVictoryRoad,
  'ravaged-path': ravagedPath,
  'oreburgh-gate': orehurghGate,
  'stark-mountain': starkMountain,
  'spring-path': springPath,
  'turnback-cave': turnbackCave,
  'snowpoint-temple': snowpointTemple,
  'wayward-cave': waywardCave
};


export default function Locations({ onChoose }) {
  const [allLocations, setAllLocations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData(url, setter) {
    setIsLoading(true);
    const response = await fetch(url);
    const locations = await response.json();
    setIsLoading(false);
    setter(locations.results);
  }

  useEffect(() => {
    fetchData("https://pokeapi.co/api/v2/location", setAllLocations);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1>Choose a location!</h1>
      <div className='locations-grid'>
        {allLocations &&
          allLocations.map((location) => (
            <div
              className='location-grid-item'
              onClick={() => onChoose({ name: location.name, url: location.url })}
              key={location.url}
              style={{ backgroundImage: `url(${locationImages[location.name]})` }}
            >
              <h2>{formatLocationName(location.name)}</h2>
            </div>
          ))}
      </div></>
  );
}

function formatLocationName(locationName) {
  let formattedName = locationName.replace(/-/g, ' '); // replaces '-' with ' '

  formattedName = formattedName.replace(/\b\w/g, c => c.toUpperCase()); // converts first letter of each word to uppercase

  return formattedName;
}

