const { Router } = require('express');
const { salesController } = require('../controllers');
const { validateToken } = require('../security/jwt');

const salesRouter = Router();

salesRouter
  .post('/', validateToken, salesController.create)
  .get('/', validateToken, salesController.findAll)
  .get('/:id', validateToken, salesController.findById)
  .patch('/:id', validateToken, salesController.patch);

module.exports = salesRouter;
