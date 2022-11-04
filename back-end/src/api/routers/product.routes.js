const { Router } = require('express');
const { productController } = require('../controllers');
const { validateTokenParams } = require('../security/jwt');

const productRouter = Router();

productRouter.get('/', validateTokenParams, productController.getAll);

module.exports = productRouter;