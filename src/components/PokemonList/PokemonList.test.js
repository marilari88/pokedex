import { render, screen } from "@testing-library/react";
import PokemonList from "./PokemonList.js";

it("Show Loading message while fetching data", async () => {
  render(<PokemonList />);
  screen.debug();
  expect(await screen.findByText(/loading/i)).toBeInTheDocument();
});
