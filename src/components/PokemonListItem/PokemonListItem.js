import React from "react";
import CatchButton from "../CatchButton/CatchButton";
import PropTypes from "prop-types";

function PokemonListItem({ pokemon }) {
  return (
    <>
      {pokemon.name}
      <CatchButton pokemonName={pokemon.name} />
    </>
  );
}

export default PokemonListItem;

PokemonListItem.proptype = {
  pokemon: PropTypes.object.isRequired,
};
