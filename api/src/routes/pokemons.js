const { Router } = require("express");
const {
  searchPokemon,
  addPokemon,
  verifyName,
} = require("../actions");
const router = Router();

router.get("/", (req, res) => {
  let { name } = req.query;
  if (name) {
    name = verifyName(name);
    console.log("id-> ", name);

    if (!name)
      return res.status(404).json({
        message: "name in not valid",
        data: {},
      });
    return searchPokemon(name)
      .then((pokemon) => {
        return res.json({
          message: "successful search",
          data: pokemon,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(404).json({
          message: `No matches found for ${name}`,
          data: {},
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
    return res.json({
      message: "successful search",
      data: pokemons,
    });
  });
});

router.get("/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id.replace(/\D/g, ""));
  if (!id)
    return res.status(404).json({
      message: "id should be a number",
      data: {},
    });

  return searchPokemon(id)
    .then((pokemon) => {
      return res.json({
        message: "successful search",
        data: pokemon,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).json({
        message: `No matches found for ${id}`,
        data: {},
      });
    });
});

router.post("/", (req, res) => {
  let { name } = req.body;
  name = verifyName(name);
  if (!name)
    return res.status(404).json({
      message: "name is not valid",
      data: {},
    });
  req.body.name = name;
  console.log("pre addPokemon");
  return addPokemon(req.body)
    .then((newPokemon) => {
      return res.json({
        message: "successful add",
        data: {
          id: newPokemon.id + 3000,
          name: newPokemon.name,
        }
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        message: "uuuups!!!",
        data: {},
      });
    });
});

module.exports = router;
