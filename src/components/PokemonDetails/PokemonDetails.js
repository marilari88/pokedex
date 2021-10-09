import React, { useState, useEffect } from "react";
import axios from "axios";

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
      console.log(result.data.species);
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
    <div>
      {loadingMessage || (
        <div className="pokemon-container">
          <div className="pokemon-code">#{pokemonData.id}</div>
          <div className="pokemon-name">{pokemonData.name}</div>
          <img alt={pokemonData.name} src={pokemonData.sprites.front_default} />

          <div className="pokemon-height">Height: {pokemonData.height}</div>
          <div className="pokemon-weight">Weight: {pokemonData.weight}</div>
          <div className="pokemon-types">
            {pokemonData.types.map(({ type }) => (
              <li>{type.name}</li>
            ))}
          </div>
          <div className="pokemon-abilities">
            {pokemonData.abilities.map(({ ability }) => (
              <li>{ability.name}</li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;
