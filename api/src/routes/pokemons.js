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
          id: pokemon.data.id,
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
  });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!Number.isInteger(id))
    return res.status(404).send({ message: "id is not a interger" });

  axios.get(URL_ID + id)
    .then((pokemon) => {
      return res.json({
        id: pokemon.data.id,
        neme: pokemon.data.name,
        life: pokemon.data.stats[0].base_stat,
        force: pokemon.data.stats[1].base_stat,
        defense: pokemon.data.stats[2].base_stat,
        speed: pokemon.data.stats[5].base_stat,
        height: pokemon.data.height,
        weight: pokemon.data.weight,
        types: pokemon.data.types.map((type) => type.type.name),
        img: pokemon.data.sprites.other["official-artwork"]
          .front_default, //URL_IMG + i + ".png",
      });
    })
    .catch((err) => {
      return res.status(201).send({});
    });
  //return res.sendStatus(205);
});

/* 
 id
 imagen
 nombre
 tipos
vida
fuerza
defensa
velocidad
Altura 
peso
 */

module.exports = router;
