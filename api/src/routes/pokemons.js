const { Router } = require("express");
const searchPokemon = require("../actions/searchPokemon.js");
const addPokemon = require("../actions/addPokemon.js");
const { Pokemon, Grade } = require("../db.js");
const router = Router();

router.get("/", (req, res) => {
  let { name } = req.query;
  if (name && typeof name === "string") {
    name = name.toLowerCase().trim().replace(/\s+/g, "-");
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
        const { id, name, img, types } = pokemon;
        return { id, name, img, types };
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

  return searchPokemon(id)
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
  let { name } = req.body;
  if (!name || typeof name !== "string")
    return res.status(404).json({ error: "name is not valid" });
  name = name
    .toLowerCase()
    .replace(/[^a-z\s\-]/g, "") // elinina todo caracter que no sea alfabetico " " o "-"
    .replace(/\-+/g, " ")
    .trim()
    .replace(/\s+/g, "-");
  if (name.length < 3)
    return res.status(404).json({ error: "name is not valid" });
  req.body.name = name;
  return addPokemon(req.body)
    .then((newPokemon) => {
      console.log("newpoke: ",newPokemon);
      return res.json({
        id: newPokemon.id + 3000,
        name: newPokemon.name,
        img: newPokemon.img
      });
    })
    .catch((error) => {
      return res.status(404).json({pokemon: "not create" ,error });
    });
  
});

module.exports = router;
