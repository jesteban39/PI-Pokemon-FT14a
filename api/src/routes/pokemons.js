const { Router } = require("express");
const searchPokemon = require("../actions/searchPokemon.js");
const router = Router();

router.get("/", (req, res, next) => {
  let { name } = req.query;
  if (name && typeof name === "string") {
    name = name.toLowerCase().trim().replace(" ", "-");
    return searchPokemon(name)
      .then((pokemon) => {
        return res.json(pokemon);
      })
      .catch((err) => {
        return res.status(404).send({
          message: `No matches found for ${name}`,
        });
      });
  }
  let pokemonsP = [];
  for (let i = 1; i <= 12; i++) {
    pokemonsP.push(
      searchPokemon(i).then((pokemon) => {
        const { id, neme, img, types } = pokemon;
        return { id, neme, img, types };
      })
    );
  }
  Promise.all(pokemonsP).then((pokemons) => {
    return res.json(pokemons);
  });
});

router.get("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  if (!Number.isInteger(id))
    return res.status(404).send({ message: "id is not a interger" });

  searchPokemon(id)
    .then((pokemon) => {
      return res.json(pokemon);
    })
    .catch((err) => {
      return res.status(404).send({
        message: `No matches found for ${id}`,
      });
    });
});

router.post("/", (req, res) => {
  let {
    neme,
    life,
    force,
    defense,
    speed,
    height,
    weight,
    types,
    img,
  } = req.body;

  

});

module.exports = router;
