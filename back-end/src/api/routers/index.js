const { Router } = require('express');
const customerRouter = require('./customer.routes');
const loginRouter = require('./login.routes');
const productRouter = require('./product.routes');
const sellerRouter = require('./seller.routes');

const router = Router();

router.use('/login', loginRouter);
router.use('/products', productRouter);
router.use('/sellers', sellerRouter);
router.use('/customer', customerRouter);

const checkoutRouter = require('./checkout.routes');
const salesRouter = require('./sales.routes');

module.exports = { 
  loginRouter,
  productRouter,
  checkoutRouter,
  salesRouter,
  sellerRouter,
  router,
};
