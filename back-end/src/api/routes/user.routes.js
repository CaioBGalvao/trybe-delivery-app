const { Router } = require('express');
const { userController } = require('../controllers');

const userRouter = Router();

userRouter
  .post('/', userController.create)
  .get('/sellers', userController.findAllSellers)
  .get('/:id', userController.findById)
  .get('/', userController.findAll);

module.exports = userRouter;