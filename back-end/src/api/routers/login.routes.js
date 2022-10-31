const express = require('express');
const { loginController } = require('../controllers');

const loginRouter = express.Router();

loginRouter
  .post('/', loginController.login)
  .post('/cadastro', loginController.create);

module.exports = loginRouter;