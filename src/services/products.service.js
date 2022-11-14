const productModel = require('../models/product.model');

const getProducts = async () => {
  const products = await productModel.allProducts();
  if (!products) {
    return { type: 'PRODUCTS_NOT_FOUND', message: 'Products not found' };
  }
  return { type: null, message: products };
};

const getById = async (id) => { 
  const product = await productModel.getById(id);
  
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const createProduct = async (name) => { 
  const productCreated = await productModel.createProduct(name);

  return { type: null, message: productCreated };
};

module.exports = {
  getProducts,
  getById,
  createProduct,
};