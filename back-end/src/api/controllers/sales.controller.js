const { salesService } = require('../services');
const securityServices = require('../security/services/security.services');

const findAll = async (req, res) => {
  const { email } = req.headers;
  const result = await securityServices.roleVerify(email);
  const allSales = await salesService.findAll(result);
  return res.status(200).json(allSales);
};

module.exports = { findAll };
