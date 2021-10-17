import { screen, render } from "@testing-library/react";
import PokemonListItem from "./PokemonListItem";

it("Show pokemon name", () => {
  const mockPokemon = { name: "ditto" };
  render(<PokemonListItem pokemon={mockPokemon} />);
  expect(screen.getByText(/ditto/i)).toBeInTheDocument();
});

it("Capitalized name pokemon", () => {
  const mockPokemon = { name: "ditto" };
  render(<PokemonListItem pokemon={mockPokemon} />);
  expect(screen.getByText(/Ditto/)).toBeInTheDocument();
});
