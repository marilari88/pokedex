import React, { useState, useEffect } from "react";
import "./PokemonDetails.css";
import axios from "axios";
import CatchButton from "../CatchButton/CatchButton";
import { capitalize } from "../../utils/string";

function PokemonDetails({ selectedPokemon }) {
  const [pokemonData, setPokemonData] = useState({});
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  useEffect(() => {
    if (selectedPokemon) {
      getPokemenDetails(selectedPokemon.url);
    }
  }, [selectedPokemon]);

  // fetching pokemon details from api
  const getPokemenDetails = async (url) => {
    try {
      setLoadingMessage("Loading...");
      const result = await axios.get(url);
      setPokemonData(result.data);
      setLoadingMessage("");
    } catch (err) {
      setLoadingMessage("Error! Cannot retrieve Pokemon Details: " + err);
    }
  };

  if (!selectedPokemon) {
    return <div>No pokemon selected</div>;
  }

  return (
    <div className="pokemon-details">
      {loadingMessage || (
        <div className="pokemon-container">
          <div className="pokemon-name">
            #{pokemonData.id} {capitalize(pokemonData.name)}
          </div>
          <img
            className="pokemon-image"
            alt={pokemonData.name}
            src={pokemonData.sprites.other["official-artwork"]["front_default"]}
          />

          <div className="pokemon-height">Height: {pokemonData.height}</div>
          <div className="pokemon-weight">Weight: {pokemonData.weight}</div>
          <h3>Types</h3>
          <div className="pokemon-types">
            {pokemonData.types.map(({ type }, index) => (
              <li key={index}>{type.name}</li>
            ))}
          </div>
          <h3>Abilities</h3>
          <div className="pokemon-abilities">
            {pokemonData.abilities.map(({ ability }, index) => (
              <li key={index}>{ability.name}</li>
            ))}
          </div>
          <CatchButton pokemonName={pokemonData.name} />
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;
