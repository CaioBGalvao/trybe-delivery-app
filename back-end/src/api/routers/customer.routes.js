const { Router } = require('express');
const { customerController } = require('../controllers');

const customerRouter = Router();

customerRouter
  .post('/checkout', customerController.checkout);

module.exports = customerRouter;