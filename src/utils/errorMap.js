const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  PRODUCTS_NOT_FOUND: 404,
  FAILURE_ON_CREATE_PRODUCT: 422,
  SALE_NOT_FOUND: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = { mapError, errorMap };