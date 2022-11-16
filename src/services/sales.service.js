const salesModel = require('../models/sales.model');

const createSale = async (sale) => { 
  const { id } = await salesModel.insertIdProduct();

   const result = await Promise.all(sale.map(async (elem) => { 
    salesModel.insertSale(elem, id);
  }));
  return { type: null, id, message: result };
};

module.exports = { createSale };