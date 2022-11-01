const loginController = require('./login.controller');
const productController = require('./product.controller');
const sellerController = require('./seller.controller');
const checkoutController = require('./checkout.controller');
const salesController = require('./sales.controller');

module.exports = { 
  loginController,
  productController,
  checkoutController,
  salesController,
  sellerController,
};