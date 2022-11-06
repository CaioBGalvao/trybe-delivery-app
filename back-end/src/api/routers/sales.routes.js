const { Router } = require('express');
const { salesController } = require('../controllers');
const { validateToken } = require('../security/jwt');

const salesRouter = Router();

salesRouter
  .get('/:id', validateToken, salesController.findAll)
  .get('/saleDetail/:id', validateToken, salesController.findOne);
module.exports = salesRouter;
