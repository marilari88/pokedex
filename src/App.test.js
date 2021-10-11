import { render, screen } from "@testing-library/react";
import App from "./App";
import axios from "axios";
import PokemonList from "./components/PokemonList/PokemonList";

jest.mock("axios");

describe("Testing get request", () => {
  beforeEach(() => {
    const response = {
      status: 200,
      data: { results: [{ name: "ditto" }, { name: "bulbasaur" }] },
    };

    axios.get.mockImplementation(() => Promise.resolve(response));
  });

  it("Show pokemon names", async () => {
    render(<PokemonList />);
    expect(await screen.findByText(/ditto/i)).toBeInTheDocument();
    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
  });
});

it("Show error if get request fails", async () => {
  axios.get.mockImplementation(() => Promise.reject(new Error()));
  render(<PokemonList />);
  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});

it("Show application title", () => {
  render(<App />);
  expect(screen.getByText(/pokedex/i)).toBeInTheDocument();
});
