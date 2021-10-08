import { screen, render } from "@testing-library/react";
import PokemonListItem from "./PokemonListItem";

it("show pokemon name", () => {
  const mockPokemon = { name: "ditto" };
  render(<PokemonListItem pokemon={mockPokemon} />);
  expect(screen.getByText(/ditto/i)).toBeInTheDocument();
});
