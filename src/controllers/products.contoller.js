const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap'); 

const getProducts = async (_req, res) => {
  const { type, message } = await productsService.getProducts();
  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(Number(id));
 
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};
  
const createProduct = async (req, res) => {
  const { body } = req;
  const { type, message } = await productsService.createProduct(body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const editProduct = async (req, res) => { 
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productsService.editProduct(Number(id), name);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
 
  res.status(200).json(message);
};
  
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.deleteProduct(Number(id));
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).end();
};

const getProductsByQuery = async (req, res) => { 
  const { q } = req.query;

  const { type, message } = await productsService.getProductsByQuery(q);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  getProducts,
  getById,
  createProduct,
  editProduct,
  deleteProduct,
  getProductsByQuery,
};