const express = require('express');
const { errorHandler } = require('./middlewares');
require('express-async-errors');
const router = require('./routers');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

// rotas aqui
app.use(router);
app.use(errorHandler)

module.exports = app;
