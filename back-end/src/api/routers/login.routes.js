const express = require('express');
const { loginMiddleware } = require('../middlewares');
const { loginController } = require('../controllers');

const loginRouter = express.Router();

loginRouter
  .post('/', loginMiddleware.loginBodyVerify, loginController.login)
  .post('/cadastro', loginMiddleware.createBodyVerify, loginController.create);

module.exports = loginRouter;