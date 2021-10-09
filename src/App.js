import React, { useState } from "react";
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import "./App.css";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <PokemonList
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
      <PokemonDetails selectedPokemon={selectedPokemon} />
    </div>
  );
}

export default App;
