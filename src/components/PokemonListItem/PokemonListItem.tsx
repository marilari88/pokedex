import { useState, useEffect } from "react";
import CatchButton from "../CatchButton/CatchButton";
import { useMyPokemon } from "../../context/MyPokemonContext";

import { capitalize } from "../../utils/string";

import "./PokemonListItem.css";
import { PokemonItem } from "../../interfaces/pokemonItem";

type PokemonListItemProps = {
  pokemon: PokemonItem;
};

function PokemonListItem({ pokemon }: PokemonListItemProps) {
  const { myPokemonArray, setMyPokemonArray } = useMyPokemon();
  const [isCaught, setIsCaught] = useState<boolean | null>(null);

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
        {isCaught !== null ? (
          <CatchButton
            catchToggle={catchToggle}
            isCaught={isCaught}
            dataTestId={`${pokemon.name}-li-button`}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default PokemonListItem;
