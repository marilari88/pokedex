import { render, screen } from "@testing-library/react";
import { MyPokemonProvider } from "../../context/MyPokemonContext";
import PokemonList from "./PokemonList";

describe("Loading simulation", () => {
  it("Show Loading message while fetching data", async () => {
    const setSelectedPokemonMock = jest.fn();
    render(
      <PokemonList
        selectedPokemon={null}
        setSelectedPokemon={setSelectedPokemonMock}
      />,
      { wrapper: MyPokemonProvider }
    );
    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });
});

describe("Testing get request", () => {
  it("Show pokemon names", async () => {
    const setSelectedPokemonMock = jest.fn();
    const { findByText, queryByText, findAllByRole } = render(
      <PokemonList
        selectedPokemon={null}
        setSelectedPokemon={setSelectedPokemonMock}
      />,
      { wrapper: MyPokemonProvider }
    );
    expect(await findByText(/ivysaur/i)).toBeInTheDocument();
    expect(await findByText(/bulbasaur/i)).toBeInTheDocument();
    expect(queryByText(/ditto/i)).not.toBeInTheDocument();
    expect(await findAllByRole("listitem")).toHaveLength(8);
  });

  it("Select a pokemon of the list", async () => {
    const selectedPokemonMock = {
      name: "ivysaur",
      url: "https://fakeurl.com/ivysaur",
    };
    const setSelectedPokemonMock = jest.fn();
    const { findByTestId } = render(
      <PokemonList
        selectedPokemon={selectedPokemonMock}
        setSelectedPokemon={setSelectedPokemonMock}
      />,
      { wrapper: MyPokemonProvider }
    );
    expect(await findByTestId("li-ivysaur")).toHaveClass("pokemon-selected");
  });
});
