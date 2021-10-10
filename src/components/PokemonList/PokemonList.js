import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PokemonListItem from "../PokemonListItem/PokemonListItem";
import FilterButtons from "../FilterButtons/FilterButtons";
import { getPokemonList } from "../../services/pokemonListService";
import { isPokemonCaught } from "../../services/catchService";

function PokemonList({ selectedPokemon, setSelectedPokemon }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  const [filterName, setFilterName] = useState(null);

  useEffect(() => {
    setLoadingMessage("Loading...");
    getPokemonList()
      .then((pokemonArray) => {
        if (filterName === "Show Caught") {
          return pokemonArray.filter((pokemon) =>
            isPokemonCaught(pokemon.name)
          );
        } else if (filterName === "Show Free") {
          return pokemonArray.filter(
            (pokemon) => !isPokemonCaught(pokemon.name)
          );
        } else {
          return pokemonArray;
        }
      })
      .then((pokemonArray) => setPokemonList(pokemonArray));
    setLoadingMessage("");
  }, [filterName]);

  return (
    <div>
      {pokemonList.length === 0 ? (
        <div>{loadingMessage}</div>
      ) : (
        <>
          <FilterButtons setFilterName={setFilterName} />
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
        </>
      )}
    </div>
  );
}

export default PokemonList;

PokemonList.propTypes = {
  selectedPokemon: PropTypes.object,
  setSelectedPokemon: PropTypes.func,
};
