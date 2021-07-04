const { Pokemon, conn } = require("../db.js");
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pokemons = require('./pokemons.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons",pokemons);



module.exports = router;
