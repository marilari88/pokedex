import { createContext } from "react";

type MyPokemonContextType = {
  myPokemonArray: string[];
  setMyPokemonArray: (obj: { type: string; payload: string }) => void;
};

const MyPokemonContext = createContext<MyPokemonContextType>({
  myPokemonArray: [],
  setMyPokemonArray: () => {},
});

export default MyPokemonContext;
