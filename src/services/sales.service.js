const salesModel = require('../models/sales.model');
const { verifyIfExist } = require('../utils/service');

const SALE_NOT_FOUND = { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

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
 
  return { type: null, message: formatedResult };
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);

  if (!result.length) return SALE_NOT_FOUND;

  return { type: null, message: result };
};
  
const deleteSaleById = async (saleId) => { 
  const salesList = await salesModel.allSales();

  await salesModel.deleteSaleById(saleId);
  if (!verifyIfExist(salesList, saleId)) return SALE_NOT_FOUND;

  return { type: null, message: '' };
};

const editSaleById = async (idSale, body) => {
  const salesList = await salesModel.allSales();
 
  const result = await Promise.all(body.map(async (sale) => {
    salesModel.editSaleById(idSale, sale);
  }));

  if (!verifyIfExist(salesList, idSale)) return SALE_NOT_FOUND;
  
  return { type: null, message: result };
}; 

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  deleteSaleById,
  editSaleById,
};