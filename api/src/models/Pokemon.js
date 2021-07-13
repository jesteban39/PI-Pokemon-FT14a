const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const { STRING, INTEGER } = DataTypes;
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: STRING, unique: true, allowNull: false },
      life: { type: INTEGER },
      force: { type: INTEGER },
      defense: { type: INTEGER },
      speed: { type: INTEGER },
      height: { type: INTEGER },
      weight: { type: INTEGER },
      img: { type: STRING },
      // `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/&{id}.png`
    },
    { initialAutoIncrement: 3000 }
  );
};
