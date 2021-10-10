import axios from "axios";

const getPokemonList = async () => {
  if (localStorage.getItem("pokemonList"))
    return JSON.parse(localStorage.getItem("pokemonList"));
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=20"
    );
    localStorage.setItem("pokemonList", JSON.stringify(response.data.results));
    return JSON.parse(localStorage.getItem("pokemonList"));
  } catch (err) {
    return [];
  }
};

export { getPokemonList };
