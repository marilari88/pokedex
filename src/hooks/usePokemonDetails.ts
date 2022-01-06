import { useQuery } from "react-query";
import { PokemonItem } from "../interfaces/pokemonItem";
import { getPokemonDetails } from "../services/pokemonDetailsService";

const usePokemonDetails = (pokemon: PokemonItem | undefined) => {
  return useQuery(
    ["pokemon-details", pokemon?.name],
    () => {
      if (pokemon == null) throw new Error("No pokemon selected");
      return getPokemonDetails(pokemon?.url);
    },
    { enabled: !!pokemon }
  );
};

export default usePokemonDetails;
