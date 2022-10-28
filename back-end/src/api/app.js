const express = require('express');
require('express-async-errors');
const { errorHandler } = require('./middlewares/ErrorHandler.middlewares');
const routers = require('./routers');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

// rotas aqui
app.use('/login', routers.loginRouter);

app.use(errorHandler);

module.exports = app;
