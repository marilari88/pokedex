import { render, screen } from "@testing-library/react";
import App from "./App";
import axios from "axios";
import userEvent from "@testing-library/user-event";

jest.mock("axios");

describe("Application initial rendering", () => {
  it("Show application title", () => {
    const { getByText } = render(<App />);
    expect(getByText(/pokedex/i)).toBeInTheDocument();
  });
});

describe("Select a pokemon from the list", () => {
  it("Select ditto from the list", async () => {
    let listResponse = {
      status: 200,
      data: {
        results: [
          { name: "ditto", url: "fakeurl" },
          { name: "bulbasaur", url: "fakeurl" },
        ],
      },
    };
    let pokemonResponse = {
      status: 200,
      data: {
        id: "132",
        name: "ditto",
        height: "30",
        weight: "40",
        types: ["normal"],
        abilities: ["Limber", "Imposter"],
      },
    };

    const getPokemenDetails = jest.fn();
    axios.get.mockImplementation(() => Promise.resolve(listResponse));
    const { findByText } = render(<App />);
    expect(await findByText(/ditto/i)).toBeInTheDocument();
    axios.get.mockImplementation(() => Promise.resolve(pokemonResponse));
    userEvent.click(await findByText(/ditto/i));
    expect(await findByText(/#132/)).toBeInTheDocument();
  });
});
