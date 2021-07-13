const { Router } = require("express");
const {
  searchPokemon,
  addPokemon,
  verifyName,
} = require("../actions");
const router = Router();

const ROUTE = "http://localhost:3001/pokemons";
const TOTAL = 40;

//?from=1&limit=12
router.get("/", (req, res) => {
  let { from, limit, name, id } = req.query;
  from = parseInt(from);
  if (!from || from < 1) from = 1;
  //if (from > TOTAl) from = TOTAL;
  limit = parseInt(limit);
  if (!limit || limit < 1 ) limit = 12;

  if(from <= 0) return res.json({
    count: TOTAL,
    previous: null,
    next: req.path + `?from=1&limit=${limit}`,
    message: "successful search",
    data: {}
  });

  let pokemonsP = [];
  let i = from;
  for (; i < from + limit && i <= TOTAL; i++) {
    pokemonsP.push(
      searchPokemon(i).then((pokemon) => {
        const { id, name, img, types } = pokemon;
        return { id, name, img, types };
      })
    );
  }
  Promise.all(pokemonsP)
    .then((pokemons) => {
      return res.json({
        count: TOTAL,
        previous:
          from > 1 ? ROUTE + `?from=${from}&limit=${limit}` : null,
        next: i <= TOTAL ? ROUTE + `?from=${i}&limit=${limit}` : null,
        message: "successful search",
        data: pokemons,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        mesages: "uups!",
        error: error,
      });
    });
});

router.get("/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
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
        },
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
/* 
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
 */
