import { useQuery } from "react-query";
import { PokemonDetails } from "../interfaces/pokemonDetails";
import { PokemonItem } from "../interfaces/pokemonItem";
import { getPokemonDetails } from "../services/pokemonDetailsService";

const usePokemonDetails = (pokemon: PokemonItem | null) => {
  return useQuery<PokemonDetails | undefined, Error>(
    ["pokemon-details", pokemon?.name],
    () => {
      if (pokemon) {
        const pokemonDetails = getPokemonDetails(pokemon.url);
        return pokemonDetails;
      }
    },
    { enabled: !!pokemon }
  );
};

export default usePokemonDetails;
