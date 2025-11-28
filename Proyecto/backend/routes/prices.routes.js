const express = require('express');
const router = express.Router();
const pricesController = require('../controllers/prices.controller');
const { authenticateJWT } = require('../middleware/verifyToken.middleware');

// Ruta para actualizar todos los precios (protegida)
router.post('/prices/update-all', authenticateJWT, pricesController.updateAllPrices);

// Ruta para obtener todos los paquetes
router.get('/prices/packages', pricesController.getAllPackages);

// Ruta para obtener historial (opcional)
router.get('/prices/history', authenticateJWT, pricesController.getPriceHistory);

module.exports = router;