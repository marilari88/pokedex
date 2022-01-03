import { createContext } from "react";

export type ActionType = {
  type: "add" | "remove";
  payload: string;
};

type MyPokemonContextType = {
  myPokemonArray: string[];
  setMyPokemonArray: (action: ActionType) => void;
};

const MyPokemonContext = createContext<MyPokemonContextType>({
  myPokemonArray: [],
  setMyPokemonArray: () => {},
});

export default MyPokemonContext;
