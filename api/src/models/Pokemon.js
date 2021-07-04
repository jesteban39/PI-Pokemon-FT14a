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
        get: ()=>{
            return this.id + 3000;
        }
      },
      name: { type: STRING, allowNull: false },
      life: { type: INTEGER },
      force: { type: INTEGER },
      defense: { type: INTEGER },
      speed: { type: INTEGER },
      height: { type: INTEGER },
      weight: { type: INTEGER },
      urlArt: { type: STRING },
      // `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/&{id}.png`
    },
    { initialAutoIncrement: "3000" }
  );
};
/* 
username: {
  type: DataTypes.STRING,
  get() {
    const rawValue = this.getDataValue(username);
    return rawValue ? rawValue.toUpperCase() : null;
  }
}
const user = User.build({ username: 'SuperUser123' });
console.log(user.username); // 'SUPERUSER123'
console.log(user.getDataValue(username)); // 'SuperUser123'
 */