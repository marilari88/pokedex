import axios from "axios";

// Consider only pokemon up to the VIII Generation
const POKEMON_NUMBERS = 898;

const getPokemonList = async () => {
  if (localStorage.getItem("pokemonList"))
    return JSON.parse(localStorage.getItem("pokemonList"));
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMON_NUMBERS}`
  );
  localStorage.setItem("pokemonList", JSON.stringify(response.data.results));
  return JSON.parse(localStorage.getItem("pokemonList"));
};

export { getPokemonList };
