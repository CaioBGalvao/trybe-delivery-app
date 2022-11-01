const { Router } = require('express');
const { salesController } = require('../controllers');

const salesRouter = Router();

salesRouter
  .get('/', salesController.getAllSales)
  .get('/:id', salesController.getSalesById);

module.exports = salesRouter;