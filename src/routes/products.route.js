const { Router } = require('express');

const productsRoute = Router();
const productsController = require('../controllers/products.contoller');

productsRoute.get('/', productsController.getProducts);
productsRoute.get('/:id', productsController.getById);

module.exports = productsRoute; 