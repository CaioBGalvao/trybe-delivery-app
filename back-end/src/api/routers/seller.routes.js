const { Router } = require('express');
const { sellerController } = require('../controllers');

const sellerRouter = Router();

sellerRouter
  .get('/', sellerController.getAllSellerUsers);

module.exports = sellerRouter;
