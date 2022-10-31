const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares');
require('express-async-errors');
const router = require('./routers');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

// rotas aqui
app.use('/login', router.loginRouter);

// middleware de erro
app.use(errorHandler);

module.exports = app;
