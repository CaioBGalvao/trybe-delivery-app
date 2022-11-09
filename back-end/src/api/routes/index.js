const { Router } = require('express');
const loginRouter = require('./Login.routes');
const productRouter = require('./Product.routes');
const salesRouter = require('./Sales.routes');
const userRouter = require('./User.routes');

const router = Router();

router
  .use('/login', loginRouter)
  .use('/products', productRouter)
  .use('/sales', salesRouter)
  .use('/users', userRouter);

module.exports = router;