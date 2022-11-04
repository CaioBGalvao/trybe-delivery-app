const { Router } = require('express');
const { checkoutController } = require('../controllers');
const { validateTokenParams } = require('../security/jwt');

const checkoutRouter = Router();

checkoutRouter
  .post('/', validateTokenParams(true), checkoutController.checkout)
  .patch('/update/:id', validateTokenParams(true), checkoutController.updateCheckoutById);

module.exports = checkoutRouter;