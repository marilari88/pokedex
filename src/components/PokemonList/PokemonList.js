import React, { useState, useEffect } from "react";
import PokemonListItem from "../PokemonListItem/PokemonListItem";
import axios from "axios";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    loadPokemonList();
  }, []);

  const loadPokemonList = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    setPokemonList(response.data.results);
  };

  return (
    <div>
      <h1>Pokemon List</h1>
      {pokemonList.map((pokemon, index) => {
        return <PokemonListItem key={index} pokemon={pokemon} />;
      })}
    </div>
  );
}

export default PokemonList;
