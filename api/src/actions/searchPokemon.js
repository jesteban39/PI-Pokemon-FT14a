const axios = require("axios");

const URL_ID = "https://pokeapi.co/api/v2/pokemon/";

/**
 * search for a pokemon by entering its name or id
 * @param {*} payload integer id or string name
 * @returns Pomise for a pokemon
 */

const searchPokemon = (payload) => {
  return axios.get(URL_ID + payload).then((pokemon) => {
    return {
      id: pokemon.data.id,
      neme: pokemon.data.name,
      life: pokemon.data.stats[0].base_stat,
      force: pokemon.data.stats[1].base_stat,
      defense: pokemon.data.stats[2].base_stat,
      speed: pokemon.data.stats[5].base_stat,
      height: pokemon.data.height,
      weight: pokemon.data.weight,
      types: pokemon.data.types.map((type) => type.type.name),
      img: pokemon.data.sprites.other["official-artwork"]
        .front_default, //URL_IMG + i + ".png",
    };
  });
};

module.exports = searchPokemon;
