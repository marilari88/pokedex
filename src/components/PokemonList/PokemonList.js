import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PokemonListItem from "../PokemonListItem/PokemonListItem";
import FilterButtons from "../FilterButtons/FilterButtons";
import SearchInput from "../SearchInput/SearchInput";
import { getPokemonList } from "../../services/pokemonListService";
import { isPokemonCaught } from "../../services/catchService";
import { escapeRegularExpression } from "../../utils/regularexpression";

function PokemonList({ selectedPokemon, setSelectedPokemon }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  const [filterName, setFilterName] = useState(null);
  const [searchText, setSearchText] = useState("");

  const refreshList = () => {};

  useEffect(() => {
    setLoadingMessage("Loading...");
    getPokemonList()
      .then((pokemonArray) => {
        // Apply filter based on Selected button
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
      .then((pokemonArray) => {
        // Apply filter by search text
        if (searchText) {
          const searchRegExp = new RegExp(
            escapeRegularExpression(searchText),
            "i"
          );
          return pokemonArray.filter((pokemon) =>
            searchRegExp.test(pokemon.name)
          );
        } else {
          return pokemonArray;
        }
      })
      .then((pokemonArray) => setPokemonList(pokemonArray));
    setLoadingMessage("");
    // setSelectedPokemon(null);
  }, [filterName, searchText]);

  return (
    <div>
      <SearchInput searchText={searchText} setSearchText={setSearchText} />
      <FilterButtons setFilterName={setFilterName} />
      {pokemonList.length === 0 ? (
        <div>{loadingMessage}</div>
      ) : (
        <>
          <ul>
            {pokemonList.map((pokemon, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedPokemon(pokemon);
                  }}
                >
                  <PokemonListItem pokemon={pokemon} />
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
