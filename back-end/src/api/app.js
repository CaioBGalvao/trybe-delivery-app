const express = require('express');
require('express-async-errors');
const { ErrorHandler } = require('./middlewares');
const router = require('./routers');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

// rotas aqui
app.use(router);

app.use(ErrorHandler());
module.exports = app;
