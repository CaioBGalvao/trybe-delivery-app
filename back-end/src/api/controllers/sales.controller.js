const { salesService } = require('../services');
const securityServices = require('../security/services/security.services');

const findAll = async (req, res) => {
  const { email } = req.headers;
  const user = await securityServices.roleVerify(email);
  console.log(user);
  const sales = await salesService.findAll(user);
  return res.status(200).json(sales);
};

const findOne = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findOne(id);
  
  if (!sale) res.status(404).json({ message: 'Sale not found' });
  
  return res.status(200).json(sale);
};

module.exports = { findAll, findOne };