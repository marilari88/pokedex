import { useState } from "react";
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
  selectedPokemon: PokemonItem | undefined;
  setSelectedPokemon: (pokemonItem: PokemonItem) => void;
};
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
    const searchRegExp = new RegExp(escapeRegExp(filterText), "i");
    return pokemonArray.filter((pokemon) => searchRegExp.test(pokemon.name));
  } else {
    return pokemonArray;
  }
}

function PokemonList({ selectedPokemon, setSelectedPokemon }: PokemonListType) {
  const [filterName, setFilterName] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  const { myPokemonArray } = useMyPokemon();
  const { status, data, error } = usePokemonList();

  let pokemonArray = data
    ? filterByStatus(data, myPokemonArray, filterName)
    : [];
  let filteredPokemonArray = filterByText(pokemonArray, searchText);

  return (
    <div className="sidebar">
      <img className="pokemon-logo" src={PokemonLogo} alt="Pokemon" />
      <div className="filter-container">
        <SearchInput searchText={searchText} setSearchText={setSearchText} />
        <FilterButtons setFilterName={setFilterName} />
      </div>
      {status === "success" ? (
        <>
          <ul className="pokemon-list">
            {filteredPokemonArray.length === 0
              ? "Empty list"
              : filteredPokemonArray.map((pokemon) => {
                  return (
                    <li
                      className={`${
                        selectedPokemon && selectedPokemon.name === pokemon.name
                          ? `pokemon-selected`
                          : ""
                      } pokemon-item`}
                      key={`li-${pokemon.name}`}
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
      ) : (
        <div className="list-message">
          {error instanceof Error ? error.message : "Loading..."}
        </div>
      )}
    </div>
  );
}

export default PokemonList;
