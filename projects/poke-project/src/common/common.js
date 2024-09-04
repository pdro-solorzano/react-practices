const BACK_SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/ID.png";
const FRONT_SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/ID.png";
const FRONT_HOME_SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/ID.png";

function capitalizeText(text) {
  return `${text?.charAt(0).toUpperCase()}${text?.slice(1)}`;
}

function getPokemonIdByUrl(url) {
  return Number(url.split("/").at(-2));
}

function getBerryIdByUrl(url) {
  return Number(url.split("/").at(-2));
}

function getPokemonIdByPokemonData(pokemon) {
  return pokemon.url.split("/")[6].padStart(4, "0");
}

const getBackSpriteUrlByPokemon = (pokemon) => {
  return BACK_SPRITE_URL.replace("ID", pokemon);
};

const getFrontSpriteUrlByPokemon = (pokemon) => {
  return FRONT_SPRITE_URL.replace("ID", pokemon);
};

const getFrontHomeSpriteUrlByPokemon = (pokemon) => {
  return FRONT_HOME_SPRITE_URL.replace("ID", pokemon);
};

export {
  capitalizeText,
  getPokemonIdByPokemonData,
  getBackSpriteUrlByPokemon,
  getFrontSpriteUrlByPokemon,
  getFrontHomeSpriteUrlByPokemon,
  getPokemonIdByUrl,
  getBerryIdByUrl,
};
