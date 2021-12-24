import { createContext } from "react";
import { PokemonItem } from "../interfaces/pokemonItem";

type MyPokemonContextType = {
  myPokemonArray: Array<PokemonItem>;
};

const MyPokemonContext = createContext<MyPokemonContextType>({
  myPokemonArray: [],
});

export default MyPokemonContext;
