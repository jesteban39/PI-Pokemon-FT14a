const searchPokemon = require("./searchPokemon.js");
const { Pokemon, Grade } = require("../db.js");

module.exports = function addPokemon(pokemon) {  
  let types = pokemon.types;
  return searchPokemon(pokemon.name).then(
    () => {throw Error(pokemon.name + " already exists")},
    () => {
      types = types.map((type) => {
        return Grade.findOne({
          where: { name: type }
        });
      });      
      return Promise.all([Pokemon.create(pokemon),...types]);
    }
  )
  .then((data) => {
    let newPokemon = data.shift()
    let types = data.map((grade) => {
      return grade.id;
    })
    return Promise.all([newPokemon,newPokemon.setGrades(types)]) 
  })
  .then((newPokemon) => {
    return newPokemon[0];
  })
}