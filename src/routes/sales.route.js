const { Router } = require('express');

const salesRoute = Router();

const salesController = require('../controllers/sales.controller');
const { validateRequest, checkProduct } = require('../middlewares/validateSalesInputs');

salesRoute.post('/', validateRequest, checkProduct, salesController.createSale);
salesRoute.get('/', salesController.getAllSales);
salesRoute.get('/:id', salesController.getSaleById);

module.exports = salesRoute; 