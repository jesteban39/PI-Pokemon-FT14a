const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo.
// Luego le injectamos la conexion a sequelize.
const { INTEGER, STRING } = DataTypes;
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("grade", {
    id: { type: INTEGER, primaryKey: true, allowNull: false },
    name: { type: STRING, unique: true, allowNull: false },
  });
};
