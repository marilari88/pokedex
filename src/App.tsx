import { useState } from "react";
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import "./App.css";
import { PokemonItem } from "./interfaces/pokemonItem";
import { MyPokemonProvider } from "./context/MyPokemonContext";
import { QueriesProvider } from "./providers/QueriesProvider";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonItem | null>(
    null
  );

  return (
    <div className="App">
      <header>
        <h1>Pokedex</h1>
      </header>
      <main>
        <QueriesProvider>
          <MyPokemonProvider>
            <PokemonList
              selectedPokemon={selectedPokemon}
              setSelectedPokemon={setSelectedPokemon}
            />
            <PokemonDetails selectedPokemon={selectedPokemon} />
            <ReactQueryDevtools initialIsOpen={false} />
          </MyPokemonProvider>
        </QueriesProvider>
      </main>
      <footer>
        <div className="signature">
          Developed by Marco Ilari -{" "}
          <a href="https://marcoilari.dev">https://marcoilari.dev</a>-
          marilari88@gmail.com
        </div>
      </footer>
    </div>
  );
}

export default App;
