const axios = require("axios");
const { Pokemon, Grade } = require("../db.js");

const URL_ID = "https://pokeapi.co/api/v2/pokemon/";

/**
 * search for a pokemon by entering its name or id
 * @param {*} payload integer id or string name
 * @returns Pomise for a pokemon
 */
module.exports = searchPokemon = (payload) => {
  return searchInApi(payload)
    .then((pokemon) => pokemon);
    /* 
    .catch((error) => {
      //console.error(error);
      return error;
    });
  then(
    (pokemon) => pokemon,
    () => searchInDb(payload)
  )
    .then((pokemon) => pokemon)
    .catch((error) => {
      console.error(error);
      return error;
    }); */
};

const searchInApi = (payload) => {
  return axios.get(URL_ID + payload).then((data) => {
    return {
      id: data.data.id,
      name: data.data.name,
      height: data.data.height,
      weight: data.data.weight,
      stats: {
        life: data.data.stats[0].base_stat,
        force: data.data.stats[1].base_stat,
        defense: data.data.stats[2].base_stat,
        speed: data.data.stats[5].base_stat,
      },
      img: data.data.sprites.other["official-artwork"].front_default, //URL_IMG + id + ".png",
      types: data.data.types.map((type) => type.type.name),
    };
  });
};

const searchInDb = (payload) => {
  let id = parseInt(payload);
  let name = new String(payload).replace(/[^a-z\s\-]/g, "");
  if (id && id > 3000 && id < 3100) {
    attribute = "id";
    payload = id - 3000;
  } else if (name && name.length > 2) {
    attribute = "name";
    payload = payload;
  } else throw new TypeError(`datos incorrectos: ${payload}`);

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
      height: data.height,
      weight: data.weight,
      stas: {
        life: data.life,
        force: data.force,
        defense: data.defense,
        speed: data.speed,
      },
      img: data.img,
      types: data.grades.map((grade) => grade.name),
    };
  });
};
