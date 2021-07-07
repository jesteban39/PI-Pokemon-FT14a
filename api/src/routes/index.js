const { Router } = require("express");

const router = Router();

const pokemons = require("./pokemons.js");
const types = require("./types.js");

router.use("/pokemons",pokemons);
router.use("/types", types);

module.exports = router;
