const priceService = require('../services/priceService');
const { Package } = require('../models');

exports.updateAllPrices = async (req, res) => {
  try {
    const { adjustmentType, value } = req.body;
    const admin = req.user; // Del middleware authenticateJWT
    
    // Validaciones
    if (!adjustmentType || !['percentage', 'fixed'].includes(adjustmentType)) {
      return res.status(400).json({
        error: 'adjustmentType debe ser "percentage" o "fixed"'
      });
    }
    
    if (typeof value !== 'number' || isNaN(value)) {
      return res.status(400).json({
        error: 'value debe ser un número válido'
      });
    }
    
    // Validar rango razonable
    if (adjustmentType === 'percentage' && Math.abs(value) > 100) {
      return res.status(400).json({
        error: 'El ajuste porcentual no puede ser mayor a ±100%'
      });
    }
    
    // Ejecutar actualización usando el patrón Observer
    const result = await priceService.updateAllPrices(adjustmentType, value, admin);
    
    res.json(result);
  } catch (error) {
    console.error('Error en updateAllPrices:', error);
    res.status(500).json({
      error: 'Error al actualizar precios',
      details: error.message
    });
  }
};

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.findAll({
      order: [['id', 'ASC']]
    });
    
    res.json(packages);
  } catch (error) {
    console.error('Error al obtener paquetes:', error);
    res.status(500).json({ 
      error: 'Error al obtener paquetes',
      details: error.message 
    });
  }
};

exports.getPriceHistory = async (req, res) => {
  try {
    const history = await priceService.getPriceHistory();
    res.json(history);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ 
      error: 'Error al obtener historial',
      details: error.message 
    });
  }
};