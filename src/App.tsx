import { useState, useReducer } from "react";
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import {
  getPokemonCaughtArray,
  savePokemonCaughtArray,
} from "./services/catchService";
import MyPokemonContext, { ActionType } from "./context/MyPokemonContext";
import "./App.css";
import { PokemonItem } from "./interfaces/pokemonItem";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonItem | null>(
    null
  );

  const reducer = (state: string[], action: ActionType) => {
    let myNewPokemonArray;
    switch (action.type) {
      case "add":
        myNewPokemonArray = [...state, action.payload];
        savePokemonCaughtArray(myNewPokemonArray);
        return myNewPokemonArray;
      case "remove":
        myNewPokemonArray = state.filter(
          (pokemon) => action.payload !== pokemon
        );
        savePokemonCaughtArray(myNewPokemonArray);
        return myNewPokemonArray;
      default:
        throw new Error();
    }
  };

  const [myPokemonArray, setMyPokemonArray] = useReducer(
    reducer,
    getPokemonCaughtArray()
  );

  return (
    <MyPokemonContext.Provider value={{ myPokemonArray, setMyPokemonArray }}>
      <div className="App">
        <header>
          <h1>Pokedex</h1>
        </header>
        <main>
          <PokemonDetails selectedPokemon={selectedPokemon} />
          <PokemonList
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon}
          />
        </main>
        <footer>
          <div className="signature">
            Developed by Marco Ilari -{" "}
            <a href="https://marcoilari.dev">https://marcoilari.dev</a>-
            marilari88@gmail.com
          </div>
        </footer>
      </div>
    </MyPokemonContext.Provider>
  );
}

export default App;
