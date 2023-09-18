const { Router } = require("express");
const movementsRoute = require("./movements");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(movementsRoute);

module.exports = router;
