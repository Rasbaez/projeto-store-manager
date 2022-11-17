const salesModel = require('../models/sales.model');

const createSale = async (sale) => { 
  const { id } = await salesModel.insertIdSale();

   const result = await Promise.all(sale.map(async (elem) => { 
    salesModel.insertSale(elem, id);
  }));
  return { type: null, id, message: result };
};

const getAllSales = async () => { 
  const allSales = await salesModel.allSales();

  if (!allSales) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  console.log(!allSales);
  return { type: null, message: allSales };
};
  
module.exports = { createSale, getAllSales };