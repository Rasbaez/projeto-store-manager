const productModel = require('../models/product.model');

const PRODUCT_NOT_FOUND = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
const PRODUCTS_NOT_FOUND = { type: 'PRODUCTS_NOT_FOUND', message: 'Products not found' };

const getProducts = async () => {
  const products = await productModel.allProducts();
  if (!products) {
    return PRODUCTS_NOT_FOUND;
  }
  return { type: null, message: products };
};

const getById = async (id) => { 
  const product = await productModel.getById(id);

  if (!product) return PRODUCT_NOT_FOUND;
  return { type: null, message: product };
};

const createProduct = async (name) => { 
  const productCreated = await productModel.createProduct(name);

  return { type: null, message: productCreated };
};

const editProduct = async (id, name) => {
  const product = await productModel.getById(id);

  if (!product) return PRODUCT_NOT_FOUND;
 
  const productEdited = await productModel.editProduct(id, name);

  return { type: null, message: productEdited };
};
 
const deleteProduct = async (productId) => {
  const productsList = await productModel.allProducts();
  const productExist = productsList.some(({ id }) => id === productId);

  await productModel.deleteProduct(productId);
  console.log(productExist);
  console.log(productsList);

  if (!productExist) return PRODUCT_NOT_FOUND;

  return { type: null, message: '' };
};

module.exports = {
  getProducts,
  getById,
  createProduct,
  editProduct,
  deleteProduct,
};