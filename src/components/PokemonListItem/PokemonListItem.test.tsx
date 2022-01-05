import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/renderWithProviders";
import PokemonListItem from "./PokemonListItem";

it("Show pokemon name", () => {
  const mockPokemon = { name: "ditto", url: "https:/fakeurl.com/ditto" };
  renderWithProviders(<PokemonListItem pokemon={mockPokemon} />, {});
  expect(screen.getByText(/ditto/i)).toBeInTheDocument();
});

it("Capitalized name pokemon", () => {
  const mockPokemon = { name: "ditto", url: "https:/fakeurl.com/ditto" };
  renderWithProviders(<PokemonListItem pokemon={mockPokemon} />, {});
  expect(screen.getByText(/Ditto/)).toBeInTheDocument();
});
