const loginRouter = require('./login.routes');
const productRouter = require('./product.routes');
const sellerRouter = require('./seller.routes');
const checkoutRouter = require('./checkout.routes');
const salesRouter = require('./sales.routes');

module.exports = { 
  loginRouter,
  productRouter,
  checkoutRouter,
  salesRouter,
  sellerRouter,
};