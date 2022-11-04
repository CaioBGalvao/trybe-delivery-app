const { Router } = require('express');
const { salesController } = require('../controllers');

const salesRouter = Router();

salesRouter
  .get('/:id', salesController.getAllSales)
  .get('/:id', salesController.getSalesById);

module.exports = salesRouter;