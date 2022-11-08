const { salesService } = require('../services');
const securityServices = require('../security/services/security.services');

const findAll = async (req, res) => {
  const { email } = req.body;
  const user = await securityServices.roleVerify(email);
  const sales = await salesService.findAll(user); 
  return res.status(200).json(sales);
};

const findOne = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findOne(id);

  if (!sale) res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sale = await salesService.update(id, status);
  if (!sale) res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(sale);
}

module.exports = { findAll, findOne, update };
