const { Router } = require('express');
const { salesController } = require('../controllers');
const { validateToken } = require('../security/jwt');

const salesRouter = Router();

salesRouter
  .get('/', validateToken, salesController.findAll);

module.exports = salesRouter;
