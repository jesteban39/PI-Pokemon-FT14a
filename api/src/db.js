require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const verifyName = require("./actions/verifyName.js");
const toNum = require("./actions/toNum.js");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const modelDefiners = [];
const basename = path.basename(__filename);
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`,
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
  pokemon.name = verifyName(pokemon.name);
  if (!pokemon.name) throw Error("It requires a valid name");
  if (!pokemon.img)
    pokemon.img =
      "https://www.kindpng.com/picc/m/20-202226_yvr-pokeball-poke-ball-hd-png-download.png";

  const stats = [
    "life",
    "force",
    "defense",
    "speed",
    "height",
    "weight",
  ];
  stats.map((stat) => {
    pokemon[stat] = toNum(pokemon[stat]);
  });
});

//Grade.sync({ force: true });
//types.sync({ force: true });
//Pokemon.sync({ force: true });
//Grade.afterSync((res) => { return});

Pokemon.belongsToMany(Grade, { through: "types" });
Grade.belongsToMany(Pokemon, { through: "types" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
