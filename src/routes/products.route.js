const { Router } = require('express');

const productsRoute = Router();
const productsController = require('../controllers/products.contoller');
const { validateFields } = require('../middlewares/validateNewProductField');

productsRoute.get('/', productsController.getProducts);
productsRoute.get('/:id', productsController.getById);
productsRoute.post('/', validateFields, productsController.createProduct);

module.exports = productsRoute; 