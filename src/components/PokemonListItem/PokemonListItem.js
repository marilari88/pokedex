import React from "react";

function PokemonListItem({ pokemon }) {
  console.log(pokemon);
  return <div>{pokemon.name}</div>;
}

export default PokemonListItem;
