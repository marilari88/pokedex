import axios from "axios";
import { PokemonItem, PokemonListResponse } from "../interfaces/pokemonItem";

// Consider only pokemon up to the VIII Generation
const POKEMON_NUMBERS = 898;

const getPokemonList = async () => {
  const pokemonListString = localStorage.getItem("pokemonList");
  if (pokemonListString != null)
    return JSON.parse(pokemonListString) as Array<PokemonItem>;

  const response = await axios.get<PokemonListResponse>(
    `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMON_NUMBERS}`
  );

  localStorage.setItem("pokemonList", JSON.stringify(response.data.results));
  return response.data.results;
};

export { getPokemonList };
