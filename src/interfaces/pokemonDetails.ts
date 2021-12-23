type Ability = {
  ability: { name: string };
};

type Sprites = {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};

type PokemonType = {
  type: { name: string };
};

export type PokemonDetails = {
  abilities: Array<Ability>;
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: Sprites;
  types: Array<PokemonType>;
};
