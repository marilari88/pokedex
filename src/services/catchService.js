// Get pokemon array that is already in localstorage
const getPokemonCaughtArray = () => {
  const lsArray = localStorage.getItem("pokemonCaughtArray");
  return lsArray ? JSON.parse(lsArray) : [];
};

// Save list of pokemon to the localStorage
const savePokemonCaughtArray = (pokemonArray) => {
  localStorage.setItem("pokemonCaughtArray", JSON.stringify(pokemonArray));
};

export { getPokemonCaughtArray, savePokemonCaughtArray };
