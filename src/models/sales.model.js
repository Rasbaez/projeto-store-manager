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
  return { type: null, message: result };
};

const allSales = async () => {
  const [result] = await connection.execute(
    `SELECT s.id, s.date, p.product_id, p.quantity FROM StoreManager.sales s
      INNER JOIN sales_products AS p ON s.id = p.sale_id
      ORDER BY p.product_id`,
  );

  const formatedResult = result.map(
    ({ id: saleId, date, product_id: productId, quantity }) => ({
      saleId,
        date,
        productId,
        quantity,
     }),
);

  return [...formatedResult];
};

module.exports = { insertIdSale, insertSale, allSales };