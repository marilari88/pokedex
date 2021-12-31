import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { renderWithProviders } from "../../utils/renderWithProviders";
import PokemonDetails from "./PokemonDetails";

const selectedPokemon = {
  name: "ivysaur",
  url: "https://pokeapi.co/api/v2/pokemon/2/",
};

const inexistentPokemon = {
  name: "fakepokemon",
  url: "https://pokeapi.co/api/v2/pokemon/10000/",
};

describe("Loading a inexistent pokemon", () => {
  it("Show error message if inexistent pokemon", async () => {
    const { findByText } = renderWithProviders(
      <PokemonDetails selectedPokemon={inexistentPokemon} />
    );
    expect(await findByText(/error/i)).toBeInTheDocument();
  });
});

describe("Render pokemon details", () => {
  it("Show no pokemon selected", () => {
    renderWithProviders(<PokemonDetails selectedPokemon={null} />, {});
    expect(screen.getByText(/no pokemon selected/i)).toBeInTheDocument();
  });

  it("Loading message when trying to laod a pokemon", async () => {
    const { getByText } = renderWithProviders(
      <PokemonDetails selectedPokemon={selectedPokemon} />
    );
    await waitForElementToBeRemoved(() => getByText(/loading/i));
  });

  it("Show ivisaur name", async () => {
    const { findByText } = renderWithProviders(
      <PokemonDetails selectedPokemon={selectedPokemon} />
    );
    expect(await findByText(/ivysaur/i)).toBeInTheDocument();
  });

  it("Show ivisaur code", async () => {
    const { findByText } = renderWithProviders(
      <PokemonDetails selectedPokemon={selectedPokemon} />
    );
    expect(await findByText(/#002/)).toBeInTheDocument();
  });

  it("Pokemon name has to be Capitalized", async () => {
    const { findByText } = renderWithProviders(
      <PokemonDetails selectedPokemon={selectedPokemon} />
    );
    expect(await findByText(/Ivysaur/)).toBeInTheDocument();
  });
});
