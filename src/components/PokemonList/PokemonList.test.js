import { render, screen } from "@testing-library/react";
import PokemonList from "./PokemonList.js";
import axios from "axios";

jest.mock("axios");

describe("Loading simulation", () => {
  it("Show Loading message while fetching data", async () => {
    const setSelectedPokemonMock = jest.fn();
    render(
      <PokemonList
        selectedPokemon={null}
        setSelectedPokemon={setSelectedPokemonMock}
      />
    );
    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });
});

describe("Simulate problem in fetching data", () => {
  it("Show error if get request fails", async () => {
    const setSelectedPokemonMock = jest.fn();
    axios.get.mockImplementation(() =>
      Promise.reject(new Error("Cannot fetch pokemon data"))
    );
    render(
      <PokemonList
        selectedPokemon={null}
        setSelectedPokemon={setSelectedPokemonMock}
      />
    );
    expect(
      await screen.findByText(/cannot fetch pokemon data/i)
    ).toBeInTheDocument();
  });
});

describe("Testing get request", () => {
  beforeEach(() => {
    let response = {
      status: 200,
      data: { results: [{ name: "ditto" }, { name: "bulbasaur" }] },
    };

    axios.get.mockImplementation(() => Promise.resolve(response));
  });

  it("Show pokemon names", async () => {
    const setSelectedPokemonMock = jest.fn();
    const { findByText, queryByText, findAllByRole } = render(
      <PokemonList
        selectedPokemon={null}
        setSelectedPokemon={setSelectedPokemonMock}
      />
    );
    expect(await findByText(/ditto/i)).toBeInTheDocument();
    expect(await findByText(/bulbasaur/i)).toBeInTheDocument();
    expect(queryByText(/charmender/i)).not.toBeInTheDocument();
    expect(await findAllByRole("listitem")).toHaveLength(2);
  });

  it("Select a pokemon of the list", async () => {
    const selectedPokemonMock = {
      name: "ditto",
    };
    const setSelectedPokemonMock = jest.fn();
    const { findByTestId } = render(
      <PokemonList
        selectedPokemon={selectedPokemonMock}
        setSelectedPokemon={setSelectedPokemonMock}
      />
    );
    expect(await findByTestId("li-ditto")).toHaveClass("pokemon-selected");
  });
});
