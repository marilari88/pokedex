import React, { useState, useEffect, useContext } from "react";
import "./PokemonDetails.css";
import axios from "axios";
import CatchButton from "../CatchButton/CatchButton";
import PokemonImage from "../PokemonImage/PokemonImage";
import MyPokemonContext from "../../context/MyPokemonContext";
import { capitalize, leftPad } from "../../utils/string";

function PokemonDetails({ selectedPokemon }) {
  const [pokemonData, setPokemonData] = useState({});
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  const { myPokemonArray, setMyPokemonArray } = useContext(MyPokemonContext);
  const [isCaught, setIsCaught] = useState(null);

  useEffect(() => {
    if (myPokemonArray && selectedPokemon)
      setIsCaught(myPokemonArray.includes(selectedPokemon.name));
  }, [selectedPokemon, myPokemonArray]);

  const catchToggle = () => {
    if (!isCaught) {
      setMyPokemonArray({ type: "add", payload: selectedPokemon.name });
    } else {
      setMyPokemonArray({ type: "remove", payload: selectedPokemon.name });
    }
    setIsCaught((prevState) => !prevState);
  };

  useEffect(() => {
    if (selectedPokemon) {
      getPokemenDetails(selectedPokemon.url);
    }
  }, [selectedPokemon]);

  // fetching pokemon details from api
  const getPokemenDetails = async (url) => {
    try {
      setLoadingMessage("Loading...");
      const result = await axios.get(url);
      setPokemonData(result.data);
      setLoadingMessage("");
    } catch (err) {
      setLoadingMessage("Error! Cannot retrieve Pokemon Details: " + err);
    }
  };

  if (!selectedPokemon) {
    return (
      <div className="pokemon-container">
        <div className="message">No pokemon selected</div>
      </div>
    );
  }

  if (loadingMessage) {
    return (
      <div className="pokemon-container">
        <div className="message">Loading</div>
      </div>
    );
  }

  return (
    <div className="pokemon-details">
      <div className="pokemon-container">
        <div className="pokemon-name">
          #{leftPad(pokemonData.id, 3)} {capitalize(pokemonData.name)}
        </div>
        <PokemonImage
          pokemonImageUrl={
            pokemonData.sprites.other["official-artwork"]["front_default"]
          }
          pokemonName={pokemonData.name}
        />
        <div className="pokemon-height">
          <span className="label">Height:</span> {pokemonData.height / 10} m
        </div>
        <div className="pokemon-weight">
          <span className="label">Weight:</span> {pokemonData.weight / 10} Kg
        </div>
        <h3>Types</h3>
        <ul className="pokemon-types">
          {pokemonData.types.map(({ type }, index) => (
            <li key={index}>{capitalize(type.name)}</li>
          ))}
        </ul>
        <h3>Abilities</h3>
        <ul className="pokemon-abilities">
          {pokemonData.abilities.map(({ ability }, index) => (
            <li key={index}>{capitalize(ability.name)}</li>
          ))}
        </ul>
        <h3>Status</h3>
        <div className="status-row">
          {isCaught ? `The pokemon is caught ` : `The pokemon is free `}
          <CatchButton catchToggle={catchToggle} isCaught={isCaught} />
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
