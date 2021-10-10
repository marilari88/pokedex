// Get pokemon array that is already in localstorage
const getPokemonCaughtArray = () => {
  const lsArray = localStorage.getItem("pokemonCaughtArray");
  return lsArray ? JSON.parse(lsArray) : [];
};

// Check if a pokemon is already Caught
const isPokemonCaught = (pokemonName) => {
  const pokemonCaughtArray = getPokemonCaughtArray();
  return pokemonCaughtArray.includes(pokemonName);
};

// Catch a Pokemon
const addCaughtPokemon = (pokemonName) => {
  const pokemonCaughtArray = getPokemonCaughtArray();
  const newPokemonArray = [...pokemonCaughtArray, pokemonName];
  localStorage.setItem("pokemonCaughtArray", JSON.stringify(newPokemonArray));
};

// Free a pokemon
const removeCaughtPokemon = (pokemonName) => {
  const pokemonCaughtArray = getPokemonCaughtArray();
  const newPokemonArray = pokemonCaughtArray.filter(
    (name) => pokemonName !== name
  );
  localStorage.setItem("pokemonCaughtArray", JSON.stringify(newPokemonArray));
};

export {
  getPokemonCaughtArray,
  isPokemonCaught,
  addCaughtPokemon,
  removeCaughtPokemon,
};
