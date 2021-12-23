import { rest } from "msw";
import { PokemonDetails } from "../interfaces/pokemonDetails";
import { PokemonListResponse } from "../interfaces/pokemonItem";

const pokemonListResponse = {
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/",
    },
    {
      name: "venusaur",
      url: "https://pokeapi.co/api/v2/pokemon/3/",
    },
    {
      name: "charmander",
      url: "https://pokeapi.co/api/v2/pokemon/4/",
    },
    {
      name: "charmeleon",
      url: "https://pokeapi.co/api/v2/pokemon/5/",
    },
    {
      name: "charizard",
      url: "https://pokeapi.co/api/v2/pokemon/6/",
    },
    {
      name: "squirtle",
      url: "https://pokeapi.co/api/v2/pokemon/7/",
    },
    {
      name: "wartortle",
      url: "https://pokeapi.co/api/v2/pokemon/8/",
    },
  ],
} as PokemonListResponse;

const pokemonDetailsResponse = {
  abilities: [
    { ability: { name: "overgrow" } },
    { ability: { name: "chlorophyll" } },
  ],
  id: 2,
  name: "ivysaur",
  height: 10,
  weight: 130,
  sprites: {
    other: {
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
      },
    },
  },
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
} as PokemonDetails;

export const handlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon/2", (req, res, ctx) => {
    return res(
      ctx.delay(200),
      ctx.status(200),
      ctx.json(pokemonDetailsResponse)
    );
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/10000", (req, res, ctx) => {
    return res(
      ctx.delay(200),
      ctx.status(404),
      ctx.json({ errorMessage: "Pokemon not found" })
    );
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/*", (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(pokemonListResponse));
  }),
];
