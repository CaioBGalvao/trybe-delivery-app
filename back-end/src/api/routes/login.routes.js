const { Router } = require('express');
const { loginController } = require('../controllers');

const loginRouter = Router();

loginRouter.post('/', loginController.login)
  .post('/cadastro', loginController.create);

module.exports = loginRouter;