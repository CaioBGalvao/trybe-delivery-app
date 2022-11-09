const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares');
require('express-async-errors');
const router = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());

// I'm not a Tea Pot
app.get('/coffee', (_req, res) => res.status(418).end());

// middleware de UPLOAD
app.use('/images', express.static('public'));

// rotas aqui
app.use('/login', router.loginRouter);
app.use('/products', router.productRouter);
app.use('/sellers', router.sellerRouter);
app.use('/checkout', router.checkoutRouter);
app.use('/sales', router.salesRouter);
app.use('/users', router.userRouter);

// middleware de erro
app.use(errorHandler);

module.exports = app;
