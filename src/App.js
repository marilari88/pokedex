import React, { useState, useReducer } from "react";
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import {
  getPokemonCaughtArray,
  savePokemonCaughtArray,
} from "./services/catchService";
import MyPokemonContext from "./context/MyPokemonContext";
import "./App.css";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const reducer = (state, action) => {
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
          <PokemonList
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon}
          />
          <PokemonDetails selectedPokemon={selectedPokemon} />
        </main>
        <footer>
          Developed by Marco Ilari -{" "}
          <a href="https://marcoilari.dev">https://marcoilari.dev</a>-
          marilari88@gmail.com
        </footer>
      </div>
    </MyPokemonContext.Provider>
  );
}

export default App;
