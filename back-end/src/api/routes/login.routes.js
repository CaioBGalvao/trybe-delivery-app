const { Router } = require('express');
const { userController } = require('../controllers');

const loginRouter = Router();

loginRouter.post('/', userController.login);

module.exports = loginRouter;