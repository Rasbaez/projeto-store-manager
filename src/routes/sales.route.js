const { Router } = require('express');

const salesRoute = Router();

const salesController = require('../controllers/sales.controller');
const { validateRequest, checkProduct } = require('../middlewares/validateSalesInputs');

salesRoute.post('/', validateRequest, checkProduct, salesController.createSale);

module.exports = salesRoute; 