import { screen, render } from "@testing-library/react";
import { MyPokemonProvider } from "../../context/MyPokemonContext";
import PokemonListItem from "./PokemonListItem";

it("Show pokemon name", () => {
  const mockPokemon = { name: "ditto", url: "https:/fakeurl.com/ditto" };
  render(<PokemonListItem pokemon={mockPokemon} />, {
    wrapper: MyPokemonProvider,
  });
  expect(screen.getByText(/ditto/i)).toBeInTheDocument();
});

it("Capitalized name pokemon", () => {
  const mockPokemon = { name: "ditto", url: "https:/fakeurl.com/ditto" };
  render(<PokemonListItem pokemon={mockPokemon} />, {
    wrapper: MyPokemonProvider,
  });
  expect(screen.getByText(/Ditto/)).toBeInTheDocument();
});
