const searchPokemon = require("./searchPokemon.js");
const { Pokemon, Grade } = require("../db.js");

module.exports = function addPokemon(pokemon) {
  let types = pokemon.types;
  return searchPokemon(pokemon.name)
    .then(
      () => {
        throw Error(pokemon.name + " already exists");
      },
      () => {
        types = types.map((type) => {
          return Grade.findOne({
            where: { name: type },
          });
        });
        return Promise.all([Pokemon.create(pokemon), ...types]);
      }
    )
    .then((data) => {
      let newPokemon = data.shift();
      let types = data.map((grade) => {
        return grade.id;
      });
      return Promise.all([newPokemon, newPokemon.setGrades(types)]);
    })
    .then((newPokemon) => {
      return Pokemon.findOne({
        where: { id: newPokemon[0].id },
        include: Grade,
      });
    })
    .then((data) => {
      data = data.dataValues;
      if(!data) throw Error("not add")      
      data.id += 3000;
      data.types = data.grades.map((grade) => grade.dataValues.name);
      return data;
    });
};
