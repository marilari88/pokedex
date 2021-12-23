export type PokemonItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  results: Array<PokemonItem>;
};
