const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap'); 

const getProducts = async (_req, res) => {
  const { type, message } = await productsService.getProducts();
  if (type) return res.status(errorMap.mapError(type).json(message));

  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(Number(id));
 
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};
  
const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  return res.status(201).json(message);
};
module.exports = {
  getProducts,
  getById,
  createProduct,
};