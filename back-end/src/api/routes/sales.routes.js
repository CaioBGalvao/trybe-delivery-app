const { Router } = require('express');
const { salesController } = require('../controllers');
const { validateToken } = require('../security/jwt');

const salesRouter = Router();

salesRouter
  .get('/', validateToken, salesController.findAll)
  .get('/:id', validateToken, salesController.findOne)
  .patch('/:id', validateToken, salesController.patch);

module.exports = salesRouter;
