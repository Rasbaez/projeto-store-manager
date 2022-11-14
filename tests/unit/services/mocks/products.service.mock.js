const products = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' }
];

const failureRequest = { type: 'PRODUCTS_NOT_FOUND', message: 'Products not found' };
const product = { id: 3, name: 'Escudo do Capitão América' };

module.exports = { products, product, failureRequest };