import { createContext, useReducer, useContext } from "react";
import {
  getPokemonCaughtArray,
  savePokemonCaughtArray,
} from "../services/catchService";

type ActionType = {
  type: "add" | "remove";
  payload: string;
};

type ContextType = {
  myPokemonArray: string[];
  setMyPokemonArray: React.Dispatch<ActionType>;
};

const MyPokemonContext = createContext<ContextType | undefined>(undefined);

const reducer = (state: string[], action: ActionType) => {
  let myNewPokemonArray;
  switch (action.type) {
    case "add":
      myNewPokemonArray = [...state, action.payload];
      savePokemonCaughtArray(myNewPokemonArray);
      return myNewPokemonArray;
    case "remove":
      myNewPokemonArray = state.filter((pokemon) => action.payload !== pokemon);
      savePokemonCaughtArray(myNewPokemonArray);
      return myNewPokemonArray;
    default:
      throw new Error();
  }
};
function MyPokemonProvider({ children }: { children?: React.ReactNode }) {
  const [myPokemonArray, setMyPokemonArray] = useReducer(
    reducer,
    getPokemonCaughtArray()
  );

  return (
    <MyPokemonContext.Provider value={{ myPokemonArray, setMyPokemonArray }}>
      {children}
    </MyPokemonContext.Provider>
  );
}

function useMyPokemon() {
  const context = useContext(MyPokemonContext);
  if (context === undefined) {
    throw new Error("Please put useMyPokemon inside a myPokemonProvider");
  }
  return context;
}

export { MyPokemonProvider, useMyPokemon };
