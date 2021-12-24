import { createContext } from "react";
import { PokemonItem } from "../interfaces/pokemonItem";

type MyPokemonContextType = {
  myPokemonArray: Array<PokemonItem>;
  setMyPokemonArray: () => void;
};

const MyPokemonContext = createContext<MyPokemonContextType>({
  myPokemonArray: [],
  setMyPokemonArray: () => {},
});

export default MyPokemonContext;
