import React, { useEffect, useState } from "react";
import PokeballLoading from "../../assets/pokeball.gif";
import PropTypes from "prop-types";
import "./PokemonImage.css";

function PokemonImage({ pokemonImageUrl, pokemonName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => setShowImage(true), 1000);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className="image-container">
      {(isLoading || !showImage) && (
        <img className="pokemon-image" alt="Loading" src={PokeballLoading} />
      )}
      {showImage && (
        <img
          className="pokemon-image"
          alt={pokemonName}
          src={pokemonImageUrl}
          onLoad={handleImageLoaded}
        />
      )}
    </div>
  );
}

export default PokemonImage;

PokemonImage.propTypes = {
  pokemonImageUrl: PropTypes.string.isRequired,
  pokemonName: PropTypes.string,
};
