import React, { useState, useEffect } from "react";
import PokemonListItem from "../PokemonListItem/PokemonListItem";
import axios from "axios";

function PokemonList({ selectedPokemon, setSelectedPokemon }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  useEffect(() => {
    loadPokemonList();
  }, []);

  const loadPokemonList = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=20"
      );
      setPokemonList(response.data.results);
      setLoadingMessage("");
    } catch (err) {
      setLoadingMessage("Error! Cannot load Pokemon List: " + err);
    }
  };

  return (
    <div>
      {pokemonList.length === 0 ? (
        <div>{loadingMessage}</div>
      ) : (
        <ul>
          {pokemonList.map((pokemon, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setSelectedPokemon(pokemon);
                }}
              >
                <PokemonListItem
                  pokemon={pokemon}
                  setSelectedPokemon={setSelectedPokemon}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default PokemonList;
