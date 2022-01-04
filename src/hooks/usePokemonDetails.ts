import { useQuery } from "react-query";
import { PokemonDetails } from "../interfaces/pokemonDetails";
import { PokemonItem } from "../interfaces/pokemonItem";
import { getPokemonDetails } from "../services/pokemonDetailsService";

const usePokemonDetails = (pokemon: PokemonItem | null) => {
  return useQuery<PokemonDetails | undefined, Error>(
    ["pokemon-details", pokemon?.name],
    () => {
      if (pokemon) return getPokemonDetails(pokemon?.url);
    },
    { enabled: !!pokemon, retry: false }
  );
};

export default usePokemonDetails;
