const { Router } = require("express");
const axios = require("axios");

const router = Router();

let URL_ID = "https://pokeapi.co/api/v2/pokemon/";

router.get("/", (req, res, next) => {
  let { name } = req.query;
  if (name) return next();
  let pokemonsP = [];
  for (let i = 1; i <= 12; i++) {
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
  let id = parseInt(req.params.id);
  let { name } = req.query;
  if (!Number.isInteger(id))
    return res.status(404).send({ message: "id is not a interger" });
  if (id === 0 && name && typeof name === "string") {
    id = name.toLowerCase().trim().replace(" ", "-");
  }
  axios
    .get(URL_ID + id)
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
      return res
        .status(404)
        .send({ message: `No matches found for ${id}` });
    });
});

router.get("/", (req, res) => {
  let { name } = req.query;
  if (!name || typeof name !== "string")
    return res.status(404).send({ message: "name is not validate" });

  name = name.toLowerCase().trim().replace(" ", "-");

  axios
    .get(URL_ID + name)
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
      return res
        .status(404)
        .send({ message: `No matches found for ${name}` });
    });
});

module.exports = router;
