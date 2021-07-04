const { Router } = require("express");
const axios = require("axios");

const router = Router();
/*
12 pokes de la api
Imagen
Nombre
Tipos 
 */
let URL_ID = "https://pokeapi.co/api/v2/pokemon/";
let URL_IMG =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

router.get("/", (req, res) => {
  let pokemonsP = [];
  for (let i = 1; i <= 3; i++) {
    pokemonsP.push(
      axios.get(URL_ID + i).then((pokemon) => {
        return {
          neme: pokemon.data.name,
          img: pokemon.data.sprites.other["official-artwork"]
            .front_default, //URL_IMG + i + ".png",
          types: pokemon.data.types.map((type) => type.type.name),
        };
      })
    );
  }
  Promise.all(pokemonsP).then((pokemons) => {
    return res.json(pokemons);
    //return res.json(["name","img","types"]);
  });
});

module.exports = router;
