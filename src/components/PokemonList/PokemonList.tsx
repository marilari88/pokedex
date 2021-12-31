import { useState, useEffect } from "react";
import PokemonListItem from "../PokemonListItem/PokemonListItem";
import FilterButtons from "../FilterButtons/FilterButtons";
import SearchInput from "../SearchInput/SearchInput";
import { escapeRegularExpression as escapeRegExp } from "../../utils/regularexpression";
import { useMyPokemon } from "../../context/MyPokemonContext";

import "./PokemonList.css";
import PokemonLogo from "../../assets/pokemon_logo.svg";
import { PokemonItem } from "../../interfaces/pokemonItem";
import usePokemonList from "../../hooks/usePokemonList";

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
  const { status, data, error } = usePokemonList();

  useEffect(() => {
    function filterByStatus(
      pokemonArray: PokemonItem[],
      myPokemonArray: string[],
      filterStatus: string | null
    ): PokemonItem[] {
      if (filterStatus === "Show Caught") {
        return pokemonArray.filter((pokemon) =>
          myPokemonArray.includes(pokemon.name)
        );
      } else if (filterStatus === "Show Free") {
        return pokemonArray.filter(
          (pokemon) => !myPokemonArray.includes(pokemon.name)
        );
      } else {
        return pokemonArray;
      }
    }

    function filterByText(
      pokemonArray: PokemonItem[],
      filterText: string
    ): PokemonItem[] {
      if (filterText) {
        const searchRegExp = new RegExp(escapeRegExp(searchText), "i");
        return pokemonArray.filter((pokemon) =>
          searchRegExp.test(pokemon.name)
        );
      } else {
        return pokemonArray;
      }
    }

    if (status === "loading") setLoadingMessage("Loading...");

    if (error) setLoadingMessage(error.message);

    if (data) {
      try {
        let pokemonArray = filterByStatus(data, myPokemonArray, filterName);
        let filteredPokemonArray = filterByText(pokemonArray, searchText);
        setPokemonList(filteredPokemonArray);
        if (filteredPokemonArray.length === 0) {
          setLoadingMessage("Empty list");
        } else {
          setLoadingMessage("");
        }
      } catch (err) {
        setLoadingMessage(`Error: ${err}`);
      }
    }
  }, [filterName, searchText, myPokemonArray, status, data, error]);

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
