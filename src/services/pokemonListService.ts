import axios from "axios";
import { PokemonListResponse } from "../interfaces/pokemonItem";

// Consider only pokemon up to the VIII Generation
const POKEMON_NUMBERS = 898;

const getPokemonList = async () => {
  const response = await axios.get<PokemonListResponse>(
    `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMON_NUMBERS}`
  );
  return response.data.results;
};

export { getPokemonList };
