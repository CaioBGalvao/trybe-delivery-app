const { salesService } = require('../services');
const securityServices = require('../security/services/security.services');

const findAll = async (req, res) => {
  const { email } = req.headers;
  const user = await securityServices.roleVerify(email);
  const sales = await salesService.findAll(user);
  return res.status(200).json(sales);
};

const findOne = async (req, res) => {
  const { id } = req.params;
  const { email } = req.headers;
  const user = await securityServices.roleVerify(email);
  const sale = await salesService.findOne(user, id);
  return res.status(200).json(sale);
};

module.exports = { findAll, findOne };
