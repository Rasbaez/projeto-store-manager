const { Router } = require('express');

const productsRoute = Router();
const productsController = require('../controllers/products.contoller');
const { validateFields } = require('../middlewares/validateNewProductField');

productsRoute.get('/', productsController.getProducts);
productsRoute.get('/search', productsController.getProductsByQuery);
productsRoute.get('/:id', productsController.getById);
productsRoute.post('/', productsController.createProduct);
productsRoute.put('/:id', validateFields, productsController.editProduct);
productsRoute.delete('/:id', productsController.deleteProduct);
// teste
module.exports = productsRoute; 