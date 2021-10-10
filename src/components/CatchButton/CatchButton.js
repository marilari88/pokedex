import React, { useEffect, useState } from "react";
import {
  isPokemonCaught,
  addCaughtPokemon,
  removeCaughtPokemon,
} from "../../services/catchService";
import PropTypes from "prop-types";

function CatchButton({ pokemonName }) {
  const [isCaught, setIsCaught] = useState(null);

  useEffect(() => {
    setIsCaught(isPokemonCaught(pokemonName));
  }, [pokemonName]);

  const catchToggle = () => {
    if (!isCaught) {
      addCaughtPokemon(pokemonName);
    } else {
      removeCaughtPokemon(pokemonName);
    }
    setIsCaught((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={() => catchToggle()}>
        {!isCaught ? `Catch It` : `Free it`}
      </button>
    </div>
  );
}

export default CatchButton;

CatchButton.propTypes = {
  pokemonName: PropTypes.string,
};
