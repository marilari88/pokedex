import { render, screen } from "@testing-library/react";
import PokemonDetails from "./PokemonDetails";
import axios from "axios";

jest.mock("axios");

describe("Render pokemon details", () => {
  it("Show no pokemon selected", () => {
    render(<PokemonDetails />);
    expect(screen.getByText(/no pokemon selected/i)).toBeInTheDocument();
  });

  it("Show mocked pokemon", async () => {
    const mockedPokemon = {
      data: {
        abilities: [
          { ability: { name: "overgrow" } },
          { ability: { name: "chlorophyll" } },
        ],
        id: 2,
        name: "ivysaur",
        height: 10,
        weight: 130,
        sprites: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
        },
        types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockedPokemon));

    const { findByText } = render(
      <PokemonDetails selectedPokemon={{ name: "ivisaur", url: "fakeurl" }} />
    );
    expect(await findByText(/ivysaur/)).toBeInTheDocument();
  });
});
