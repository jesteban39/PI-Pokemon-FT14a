const axios = require("axios");
const { Pokemon, Grade } = require("../db.js");

const URL_ID = "https://pokeapi.co/api/v2/pokemon/";

/**
 * search for a pokemon by entering its name or id
 * @param {*} payload integer id or string name
 * @returns Pomise for a pokemon
 */
 module.exports = searchPokemon = (payload) => {
  return searchInApi(payload).then(
    (pokemon) => pokemon,
    () => searchInDb(payload)
  );
};

const searchInApi = (payload) => {
  return axios.get(URL_ID + payload).then((data) => {
    return {
      id: data.data.id,
      name: data.data.name,
      life: data.data.stats[0].base_stat,
      force: data.data.stats[1].base_stat,
      defense: data.data.stats[2].base_stat,
      speed: data.data.stats[5].base_stat,
      height: data.data.height,
      weight: data.data.weight,
      img: data.data.sprites.other["official-artwork"].front_default, //URL_IMG + i + ".png",
      types: data.data.types.map((type) => {
        return {
          id: parseInt(type.type.url.replace(/v2|\D/g, "")),
          name: type.type.name,
        };
      }),
    };
  });
};

const searchInDb = (payload) => {
  let id = parseInt(payload);
  if (id) {
    attribute = "id";
    payload -= 3000;
  } else attribute = "name";

  //return Pokemon.findByPk(payload, { include: Grade });
  return Pokemon.findAll({
    where: { [attribute]: payload },
    include: Grade, //[{model: Grade, as: "types"}],
  }).then((data) => {
    data = data[0];
    //console.log("data-> ", data);
    return {
      id: data.id + 3000,
      name: data.name,
      life: data.life,
      force: data.force,
      defense: data.defense,
      speed: data.speed,
      height: data.height,
      weight: data.weight,
      img: data.img,
      types: data.grades.map((grade) => {
        return {
          id: grade.id,
          name: grade.name,
        };
      }),
    };
  });
};