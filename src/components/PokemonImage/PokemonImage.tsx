import { useEffect, useState } from "react";
import PokeballLoading from "../../assets/pokeball.gif";
import "./PokemonImage.css";

type PokemonImageProps = {
  pokemonImageUrl?: string;
  pokemonName: string;
};

function PokemonImage({
  pokemonImageUrl,
  pokemonName,
}: PokemonImageProps): JSX.Element {
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
