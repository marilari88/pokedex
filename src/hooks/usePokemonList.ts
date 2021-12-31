import { useQuery } from "react-query";
import { PokemonItem } from "../interfaces/pokemonItem";
import { getPokemonList } from "../services/pokemonListService";

export default function usePokemonList() {
  return useQuery<PokemonItem[], Error>("pokemon-list", getPokemonList);
}
