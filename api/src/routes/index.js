const { Router } = require("express");
const dogsRoute = require("./dogsRoute");
const temperamentsRoute = require("./temperamentsRoute");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogsRoute);
router.use("/temperaments", temperamentsRoute);

module.exports = router;
