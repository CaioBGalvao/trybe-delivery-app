const { Router } = require('express');
const { checkoutController } = require('../controllers');
const { validateToken } = require('../security/jwt');

const checkoutRouter = Router();

checkoutRouter
  .post('/', validateToken, checkoutController.checkout)

module.exports = checkoutRouter;
