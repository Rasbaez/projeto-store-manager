const products = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' }
];

const newProduct = {
  "id": 4,
  "name": "ProdutoX"
};

const failureRequest = { type: 'PRODUCTS_NOT_FOUND', message: 'Products not found' };

const product = { id: 3, name: 'Escudo do Capitão América' };

const requestWrongValue = {
  "name": "Prod"
};

const productToCreate = {
  name: "Xablau"
};

const editedProduct = {
  "id": 3,
  "name": "Xablauzeraaaa"
};

const requestByQuery = [{
  'id': 1,
  'name': 'Martelo de Thor'
}];
  
module.exports = {
  products,
  product,
  failureRequest,
  newProduct,
  requestWrongValue,
  productToCreate,
  editedProduct,
  requestByQuery
};