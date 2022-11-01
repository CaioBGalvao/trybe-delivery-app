const { Router } = require('express');
const { sellerController } = require('../controllers');

const sellerRouter = Router();

sellerRouter
  .get('/sellers', sellerController.findAll);

module.exports = loginRouter;