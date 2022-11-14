const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap'); 

const getProducts = async (_req, res) => {
  const { type, message } = await productsService.getProducts();
  if (type) return res.status(errorMap.mapError(type).json(message, null, 2));

  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(Number(id));
 
  if (type) return res.status(errorMap.mapError(type)).json({ message }, null, 2);
  return res.status(200).json(message);
};
  
module.exports = {
  getProducts,
  getById,
};