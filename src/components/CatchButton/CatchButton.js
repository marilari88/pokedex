import React, { useContext, useEffect, useState } from "react";
import MyPokemonContext from "../../context/MyPokemonContext";
import PropTypes from "prop-types";

function CatchButton({ pokemonName }) {
  const { myPokemonArray, setMyPokemonArray } = useContext(MyPokemonContext);
  const [isCaught, setIsCaught] = useState(null);

  useEffect(() => {
    if (myPokemonArray) setIsCaught(myPokemonArray.includes(pokemonName));
  }, [pokemonName, myPokemonArray]);

  const catchToggle = () => {
    if (!isCaught) {
      setMyPokemonArray({ type: "add", payload: pokemonName });
    } else {
      setMyPokemonArray({ type: "remove", payload: pokemonName });
    }
    setIsCaught((prevState) => !prevState);
  };

  return (
    <>
      {isCaught !== null && (
        <button onClick={() => catchToggle()}>
          {!isCaught ? `Catch It` : `Free it`}
        </button>
      )}
    </>
  );
}

export default CatchButton;

CatchButton.propTypes = {
  pokemonName: PropTypes.string.isRequired,
};
