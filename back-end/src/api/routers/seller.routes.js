const { Router } = require('express');
const { sellerController } = require('../controllers');
const { validateToken } = require('../security/jwt');

const sellerRouter = Router();

sellerRouter
  .get('/', validateToken, sellerController.getAllSellerUsers);

module.exports = sellerRouter;
