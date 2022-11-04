const loginService = require('./login.services');
const productServices = require('./product.services');
const sellerServices = require('./seller.services');
const customerServices = require('./customer.service');
const checkoutServices = require('./checkout.services');

module.exports = { 
  loginService,
  productServices,
  checkoutServices,
  sellerServices,
  customerServices,
};
