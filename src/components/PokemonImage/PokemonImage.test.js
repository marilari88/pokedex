import { render } from "@testing-library/react";
import PokemonImage from "./PokemonImage";

const pokemon = {
  url:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
  name: "ivysaur",
};

describe("Test loading image", () => {
  it("Loading image when mount component", async () => {
    const { getByAltText } = render(
      <PokemonImage pokemonImageUrl={pokemon.url} pokemonName={pokemon.name} />
    );
    expect(getByAltText("Loading")).toBeInTheDocument();
  });
});
