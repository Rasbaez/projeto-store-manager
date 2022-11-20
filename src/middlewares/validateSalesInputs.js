const productsModel = require('../models/product.model');

const checkProduct = async (req, res, next) => {
  const { body } = req;
  const products = await productsModel.allProducts();

  const allProductIds = products.map((product) => product.id);

  const productVerify = body.every(({ productId }) => allProductIds.includes(productId));
  if (!productVerify) return res.status(404).json({ message: 'Product not found' });

  return next();
};

const validateRequest = async (req, res, next) => {
  const salesToInsert = req.body;
  const result = salesToInsert.every(({ quantity }) => quantity >= 1);
  const qtyExist = salesToInsert.every(({ quantity }) => quantity || quantity === 0);
  const idExist = salesToInsert.every(({ productId }) => productId || productId === 0);

  if (!qtyExist) {
    return res.status(400).json({ message: '"quantity" is required' });
  } if (!result) {
 return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' }); 
  } if (!idExist) {
    return res.status(400).json({ message: '"productId" is required' });
  }
 
  return next();
};

module.exports = { validateRequest, checkProduct };