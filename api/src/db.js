require("dotenv").config();
const { Sequelize } = require("sequelize");
const searchPokemon = require("./actions/searchPokemon.js");
const fs = require("fs");
const path = require("path");

const axios = require("axios");
const URL_TYPES = "https://pokeapi.co/api/v2/type/";

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const modelDefiners = [];
const basename = path.basename(__filename);
const sequelize = new Sequelize(
  `postgres://postgres:password@localhost/pokemon`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(
      require(path.join(__dirname, "/models", file))
    );
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon, Grade } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Pokemon.beforeCreate((pokemon) => {
  let name = pokemon.name
    .toLowerCase()
    .replace(/[^a-z\s\-]/g, "") // elinina todo caracter que no sea alfabetico " " o "-"
    .replace(/\-+/g, " ")
    .trim()
    .replace(/\s+/g, "-");

  if (name.length < 3) throw Error("name is not valid");

  pokemon.name = name;
      const toNum = (str) => {
        str = new String(str)
        let num = parseInt(str.replace(/[^0-9]/g, ""));
        if (!num || num <= 0 || num >= 1000) num = 1;
        return num;
      };
      const stats = ["life","force","defense","speed","height","weight"];
      stats.map(stat =>{
        pokemon[stat] = toNum(pokemon[stat]);
      })

  
});

//Grade.sync({ force: true });
//poke_types.sync({ force: true });
//Pokemon.sync({ force: true });
//Grade.afterSync((res) => { return});

axios
  .get(URL_TYPES)
  .then((res) => {
    let types = res.data.results;
    return types.map((type) => {
      let id = type.url.replace(/v2|\D/g,"");
      return Grade.create({ id: parseInt(id), name: type.name });
    });
  })
  .then((types) => {
    return Promise.all(types);
  })
  .then(() => {
    console.log("types were added");
  })
  .catch((err) => {
    console.log("types not were added");
    return err;
  });

Pokemon.belongsToMany(Grade, { through: "poke_types" });
Grade.belongsToMany(Pokemon, { through: "poke_types" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
