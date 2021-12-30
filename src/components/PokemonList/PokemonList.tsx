import { useState, useEffect } from "react";
import PokemonListItem from "../PokemonListItem/PokemonListItem";
import FilterButtons from "../FilterButtons/FilterButtons";
import SearchInput from "../SearchInput/SearchInput";
import { getPokemonList } from "../../services/pokemonListService";
import { escapeRegularExpression as escapeRegExp } from "../../utils/regularexpression";
import { useMyPokemon } from "../../context/MyPokemonContext";

import "./PokemonList.css";
import PokemonLogo from "../../assets/pokemon_logo.svg";
import { PokemonItem } from "../../interfaces/pokemonItem";

type PokemonListType = {
  selectedPokemon: PokemonItem | null;
  setSelectedPokemon: (pokemonItem: PokemonItem) => void;
};

function PokemonList({ selectedPokemon, setSelectedPokemon }: PokemonListType) {
  const [pokemonList, setPokemonList] = useState<PokemonItem[]>([]);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [filterName, setFilterName] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  const { myPokemonArray } = useMyPokemon();

  useEffect(() => {
    let isSubscribed = true;
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
      .then((pokemonArray) => {
        if (isSubscribed) {
          setPokemonList(pokemonArray);
          if (pokemonArray.length === 0) {
            setLoadingMessage("Empty list");
          } else {
            setLoadingMessage("");
          }
        }
      })
      .catch((err) => {
        if (isSubscribed) setLoadingMessage(`Error: ${err}`);
      });
    //set isSubscribed to false to prevent memory leak
    return () => {
      isSubscribed = false;
    };
  }, [filterName, searchText, myPokemonArray]);

  return (
    <div className="sidebar">
      <img className="pokemon-logo" src={PokemonLogo} alt="Pokemon" />
      <div className="filter-container">
        <SearchInput searchText={searchText} setSearchText={setSearchText} />
        <FilterButtons setFilterName={setFilterName} />
      </div>
      {loadingMessage !== "" ? (
        <div className="list-message">{loadingMessage}</div>
      ) : (
        <>
          <ul className="pokemon-list">
            {pokemonList.map((pokemon, index) => {
              return (
                <li
                  className={`${
                    selectedPokemon && selectedPokemon.name === pokemon.name
                      ? `pokemon-selected`
                      : ""
                  } pokemon-item`}
                  key={index}
                  data-testid={`li-${pokemon.name}`}
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
