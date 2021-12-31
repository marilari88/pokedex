import { useState, useEffect } from "react";
import "./PokemonDetails.css";
import CatchButton from "../CatchButton/CatchButton";
import PokemonImage from "../PokemonImage/PokemonImage";
import { useMyPokemon } from "../../context/MyPokemonContext";
import { capitalize, leftPad } from "../../utils/string";
import { PokemonItem } from "../../interfaces/pokemonItem";
import { PokemonDetails as PokemonDetailsType } from "../../interfaces/pokemonDetails";
import usePokemonDetails from "../../hooks/usePokemonDetails";

type PokemonDetailsProps = {
  selectedPokemon: PokemonItem | null;
};

function PokemonDetails({ selectedPokemon }: PokemonDetailsProps) {
  const [pokemonData, setPokemonData] = useState<PokemonDetailsType | null>(
    null
  );
  const [loadingMessage, setLoadingMessage] = useState<string | null>();
  const { myPokemonArray, setMyPokemonArray } = useMyPokemon();
  const [isCaught, setIsCaught] = useState<boolean | null>(null);

  useEffect(() => {
    if (myPokemonArray && selectedPokemon)
      setIsCaught(myPokemonArray.includes(selectedPokemon.name));
  }, [selectedPokemon, myPokemonArray]);

  const catchToggle = () => {
    if (!selectedPokemon) return;
    if (!isCaught) {
      setMyPokemonArray({ type: "add", payload: selectedPokemon.name });
    } else {
      setMyPokemonArray({ type: "remove", payload: selectedPokemon.name });
    }
    setIsCaught((prevState) => !prevState);
  };

  const { status, data, error } = usePokemonDetails(selectedPokemon);

  useEffect(() => {
    try {
      setLoadingMessage(status === "loading" ? "Loading..." : null);
      if (error) throw new Error(error.message);
      if (data) setPokemonData(data);
    } catch (err) {
      setLoadingMessage(`Error! Cannot retrieve Pokemon Details:  ${err}`);
    }
  }, [selectedPokemon, data, status, error]);

  if (loadingMessage) {
    return (
      <div className="pokemon-container">
        <div className="message">{loadingMessage}</div>
      </div>
    );
  }

  if (!pokemonData) {
    return (
      <div className="pokemon-container">
        <div className="message">No pokemon selected</div>
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
          {isCaught !== null ? (
            <CatchButton
              catchToggle={catchToggle}
              isCaught={isCaught}
              dataTestId={`${pokemonData.name}-details-button`}
            />
          ) : (
            "Cannot retrieve pokemon status"
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
