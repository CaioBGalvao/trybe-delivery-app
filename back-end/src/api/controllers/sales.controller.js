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

const patch = async (req, res) => {
  const { id: saleId } = req.params;
  const { email, status } = req.body;

  const user = await securityServices.roleVerify(email);
  const [response] = await salesService.patch({ ...user, status, saleId });

  if (!response) throw new Error(`Status is already ${status}&400`);

  return res.status(200).json(status);
};

module.exports = { findAll, findOne, patch };
