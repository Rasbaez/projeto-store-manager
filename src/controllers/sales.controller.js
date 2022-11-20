const salesService = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const { id } = await salesService.createSale(req.body);
  // if (type) return res.status(errorMap.mapError(type)).json({ message });
 
  return res.status(201).json({ id, itemsSold: req.body });
};

const getAllSales = async (_req, res) => {
  const { message } = await salesService.getAllSales();
  // if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const getSaleById = async (req, res) => { 
  const { id } = req.params;
 
  const { type, message } = await salesService.getSaleById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = { createSale, getAllSales, getSaleById };