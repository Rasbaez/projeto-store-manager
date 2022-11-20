const products = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' }
];


const product = { id: 3, name: 'Escudo do Capitão América' };


const requestNewProduct = {
  "name": "Xablau"
};

const productToEditRequest = {
  "name": "Martelo do Batman"
};

const productToEditIdResult = {
  "id": 1,
  "name": "Martelo do Batman"
}

const newProduct = { id: 5, name: 'Xablau' };

const badrequestProduct = {"nae": "Prodssfgewr" };

module.exports = {
  products,
  product,
  requestNewProduct,
  newProduct,
  productToEditIdResult,
  productToEditRequest,
  badrequestProduct
};