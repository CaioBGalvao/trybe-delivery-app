const { Router } = require('express');
const loginRouter = require('./login.routes');
const productRouter = require('./product.routes');
const salesRouter = require('./sales.routes');
const userRouter = require('./user.routes');

const router = Router();

router
  .use('/login', loginRouter)
  .use('/products', productRouter)
  .use('/sales', salesRouter)
  .use('/users', userRouter);

module.exports = router;