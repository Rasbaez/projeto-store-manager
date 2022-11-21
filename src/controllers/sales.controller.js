const salesService = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const { id } = await salesService.createSale(req.body);
 
  return res.status(201).json({ id, itemsSold: req.body });
};

const getAllSales = async (_req, res) => {
  const { message } = await salesService.getAllSales();

  return res.status(200).json(message);
};

const getSaleById = async (req, res) => { 
  const { id } = req.params;
 
  const { type, message } = await salesService.getSaleById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const deleteSaleById = async (req, res) => { 
  const { id } = req.params;
  const { type, message } = await salesService.deleteSaleById(Number(id));

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(204).json(message);
}; 
  
const editSaleById = async (req, res) => { 
  const { id } = req.params;
  const { body } = req;

  const { type, message } = await salesService.editSaleById(Number(id), body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json({ saleId: Number(id), itemsUpdated: body });
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  deleteSaleById,
  editSaleById,
};