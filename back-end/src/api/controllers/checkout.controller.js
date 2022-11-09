const { checkoutServices } = require('../services');
const securityServices = require('../security/services/security.services');

const create = async (req, res) => {
  const { email, ...checkoutObj } = req.body;
  const { role } = await securityServices.roleVerify(email);
  if (role !== 'customer') {
    throw new Error('Only customers can access this endpoint&401');
  }

  const response = await checkoutServices.checkout(checkoutObj);
  res.status(201).json(response);
};

module.exports = { checkout, patch };
