const camelize = require('camelize');
const connection = require('./connection');
const { dateNow } = require('../utils/service');

const insertIdSale = async () => {
  const date = dateNow();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)',
    [date],
  );
  return { id: insertId };
};

const insertSale = async ({ productId, quantity }, id) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
    [id, productId, quantity],
  );

  return result;
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT sp.product_id, sp.quantity, s.date FROM 
     sales_products AS sp INNER JOIN sales AS s ON s.id = sp.sale_id
     WHERE id = (?)
     ORDER by s.id`,
    [id],
  );

  return camelize(result);
};

const allSales = async () => {
  const [result] = await connection.execute(
    `SELECT s.id, s.date, p.product_id, p.quantity FROM StoreManager.sales s
      INNER JOIN sales_products AS p ON s.id = p.sale_id
      ORDER BY p.product_id`,
  );
 
  return result;
};

const deleteSaleById = async (saleId) => { 
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = (?)',
    [saleId],
  );
};

const editSaleById = async (saleId, { productId, quantity }) => connection.execute(
    `UPDATE StoreManager.sales_products 
      SET
      quantity = (?)
          WHERE sale_id = (?) AND product_id = (?)`,
  [quantity, saleId, productId],
  );

module.exports = {
  insertIdSale,
  insertSale,
  allSales,
  getSaleById,
  deleteSaleById,
  editSaleById,
};