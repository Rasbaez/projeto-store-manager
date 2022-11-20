const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  PRODUCTS_NOT_FOUND: 404,
  FAILURE_ON_CREATE_PRODUCT: 422,
  SALES_NOT_FOUND: 404,
  SALE_NOT_FOUND: 404,
  FAIL_ON_CREATE_PRODUCT: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = { mapError, errorMap };