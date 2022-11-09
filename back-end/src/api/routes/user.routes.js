const { Router } = require('express');
const { userController } = require('../controllers');

const userRouter = Router();

userRouter
  .post('', userController.create)
  .get('', userController.findAll)
  .get('/:id', userController.findById)
  .get('/sellers', userController.findAllSellers);

module.exports = userRouter;