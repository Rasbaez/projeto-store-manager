const salesService = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const { type, message, id } = await salesService.createSale(req.body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json({ id, itemsSold: req.body });
};

const getAllSales = async (_req, res) => {
  const { type, message } = await salesService.getAllSales();
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = { createSale, getAllSales };