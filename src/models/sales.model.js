const connection = require('./connection');
const { dateNow } = require('../utils/service');

const insertIdProduct = async () => {
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
  return { type: null, message: result };
};

module.exports = { insertIdProduct, insertSale };