import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import PokemonListItem from "../PokemonListItem/PokemonListItem";
import FilterButtons from "../FilterButtons/FilterButtons";
import SearchInput from "../SearchInput/SearchInput";
import { getPokemonList } from "../../services/pokemonListService";
import { escapeRegularExpression as escapeRegExp } from "../../utils/regularexpression";
import MyPokemonContext from "../../context/MyPokemonContext";

import "./PokemonList.css";
import PokemonLogo from "../../assets/pokemon_logo.svg";

function PokemonList({ selectedPokemon, setSelectedPokemon }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [filterName, setFilterName] = useState(null);
  const [searchText, setSearchText] = useState("");

  const { myPokemonArray } = useContext(MyPokemonContext);

  useEffect(() => {
    setLoadingMessage("Loading...");
    getPokemonList()
      .then((pokemonArray) => {
        // Apply filter based on Selected button
        if (filterName === "Show Caught") {
          return pokemonArray.filter((pokemon) =>
            myPokemonArray.includes(pokemon.name)
          );
        } else if (filterName === "Show Free") {
          return pokemonArray.filter(
            (pokemon) => !myPokemonArray.includes(pokemon.name)
          );
        } else {
          return pokemonArray;
        }
      })
      .then((pokemonArray) => {
        // Apply filter by search text
        if (searchText) {
          const searchRegExp = new RegExp(escapeRegExp(searchText), "i");
          return pokemonArray.filter((pokemon) =>
            searchRegExp.test(pokemon.name)
          );
        } else {
          return pokemonArray;
        }
      })
      .then((pokemonArray) => setPokemonList(pokemonArray));
    setLoadingMessage("");
  }, [filterName, searchText, myPokemonArray]);

  return (
    <div className="sidebar">
      <img className="pokemon-logo" src={PokemonLogo} alt="Pokemon" />
      <div className="filter-container">
        <SearchInput searchText={searchText} setSearchText={setSearchText} />
        <FilterButtons setFilterName={setFilterName} />
      </div>
      {pokemonList.length === 0 ? (
        <div className="list-message">{loadingMessage}</div>
      ) : (
        <>
          <ul className="pokemon-list">
            {pokemonList.map((pokemon, index) => {
              return (
                <li
                  className={`${
                    selectedPokemon !== null &&
                    selectedPokemon.name === pokemon.name
                      ? `pokemon-selected`
                      : ""
                  } pokemon-item`}
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
