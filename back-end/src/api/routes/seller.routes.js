const { Router } = require('express');
const { sellerController } = require('../controllers');
const { validateToken } = require('../security/jwt');

const sellerRouter = Router();

sellerRouter
  .get('/', validateToken, sellerController.findAll);

module.exports = sellerRouter;
