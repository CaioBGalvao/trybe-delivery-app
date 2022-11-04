const { Router } = require('express');
const { sellerController } = require('../controllers');
const { validateTokenParams } = require('../security/jwt');

const sellerRouter = Router();

sellerRouter
  .get('/', validateTokenParams, sellerController.getAllSellerUsers);

module.exports = sellerRouter;
