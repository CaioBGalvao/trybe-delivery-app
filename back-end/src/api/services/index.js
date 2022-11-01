const loginService = require('./login.services');
const productServices = require('./product.services');
const sellerServices = require('./seller.services');
const checkoutServices = require('./checkout.services');

module.exports = { 
  loginService,
  productServices,
  checkoutServices,
  sellerServices,
};