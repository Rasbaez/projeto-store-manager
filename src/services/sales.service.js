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

  const formatedResult = allSales.map(
    ({ id: saleId, date, product_id: productId, quantity }) => ({
      saleId,
      date,
      productId,
      quantity,
    }),
  );
  // console.log(formatedResult);
  if (!allSales) return { type: 'SALES_NOT_FOUND', message: 'Sales not found' };

  return { type: null, message: formatedResult };
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);

  if (!result.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: result };
};
  
module.exports = { createSale, getAllSales, getSaleById };