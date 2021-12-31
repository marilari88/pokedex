import axios from "axios";
import { PokemonDetails } from "../interfaces/pokemonDetails";

export const getPokemonDetails = async (url: string) => {
  try {
    const response = await axios.get<PokemonDetails>(url);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
