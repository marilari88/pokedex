import { render, screen } from "@testing-library/react";
import PokemonList from "./PokemonList.js";

it("Show Heading", () => {
  render(<PokemonList />);
  expect(screen.getByRole("heading")).toBeInTheDocument();
});
