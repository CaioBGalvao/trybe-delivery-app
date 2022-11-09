const { Router } = require('express');
const { productController } = require('../controllers');
const { validateToken } = require('../security/jwt');

const productRouter = Router();

productRouter.get('/', validateToken, productController.findAll);

module.exports = productRouter;