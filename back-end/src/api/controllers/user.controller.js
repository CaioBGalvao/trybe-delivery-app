const { userService } = require('../services');

const findAll = async (req, res) => {
  const users = await userService.findAll();
  return res.status(200).json(users);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.findById(id);

  return res.status(200).json(user);
};

module.exports = { findAll, findById };