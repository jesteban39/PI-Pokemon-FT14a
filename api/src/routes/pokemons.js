const { Router } = require("express");
const searchPokemon = require("../actions/searchPokemon.js");
const { Pokemon } = require("../db.js");
const router = Router();

router.get("/", (req, res) => {
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
function numbers(str) {
  return parseInt(str.replace(/[^0-9]/g, ""));
  //name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z\-]/g, "").replace(/\-+/g, "-");
}
router.post("/", (req, res) => {
  let { name } = req.body;
  if (!name || typeof name !== "string")
    return res.status(404).json({ message: "name is not valid" });
  name = name
    .toLowerCase()
    .replace(/[^a-z]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (name.length < 3)
    return res.status(404).json({ message: "name is not valid" });

  return searchPokemon(name)
    .then(
      () => {
        throw Error("existe");
      },
      () => {
        return Pokemon.create({ ...req.body, name }).then(
          (pokemon) => {
            //console.log("create: ", pokemon.dataValues);
            return res.json({
              message: "pokemon create successfully",
            });
          }
        );
      }
    )
    .catch((err) => {
      //console.log("err: ");
      return res
        .Status(404)
        .json({ message: "pokemos was not created" });
    });
});

module.exports = router;
