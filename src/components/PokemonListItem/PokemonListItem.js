import React from "react";
import CatchButton from "../CatchButton/CatchButton";
import PropTypes from "prop-types";

import { capitalize } from "../../utils/string";

import "./PokemonListItem.css";

function PokemonListItem({ pokemon }) {
  return (
    <div className="listitem">
      <div className="listitem-pokemon-name">{capitalize(pokemon.name)}</div>
      <div className="listitem-button">
        <CatchButton pokemonName={pokemon.name} />
      </div>
    </div>
  );
}

export default PokemonListItem;

PokemonListItem.propTypes = {
  pokemon: PropTypes.object.isRequired,
};
