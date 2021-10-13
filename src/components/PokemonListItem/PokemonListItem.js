import React, { useContext, useState, useEffect } from "react";
import CatchButton from "../CatchButton/CatchButton";
import MyPokemonContext from "../../context/MyPokemonContext";
import PropTypes from "prop-types";

import { capitalize } from "../../utils/string";

import "./PokemonListItem.css";

function PokemonListItem({ pokemon }) {
  const { myPokemonArray, setMyPokemonArray } = useContext(MyPokemonContext);
  const [isCaught, setIsCaught] = useState(null);

  useEffect(() => {
    if (myPokemonArray) setIsCaught(myPokemonArray.includes(pokemon.name));
  }, [pokemon, myPokemonArray]);

  const catchToggle = () => {
    if (!isCaught) {
      setMyPokemonArray({ type: "add", payload: pokemon.name });
    } else {
      setMyPokemonArray({ type: "remove", payload: pokemon.name });
    }
    setIsCaught((prevState) => !prevState);
  };

  return (
    <div className="listitem">
      <div className="listitem-pokemon-name">{capitalize(pokemon.name)}</div>
      <div className="listitem-button">
        <CatchButton catchToggle={catchToggle} isCaught={isCaught} />
      </div>
    </div>
  );
}

export default PokemonListItem;

PokemonListItem.propTypes = {
  pokemon: PropTypes.object.isRequired,
};
