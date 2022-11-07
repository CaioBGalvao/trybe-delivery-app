const { checkoutServices } = require('../services');
const securityServices = require('../security/services/security.services');

const checkout = async (req, res) => {
  const { email } = req.headers;
  const { role } = await securityServices.roleVerify(email);
  if (role !== 'customer') {
    throw new Error('Only customers can access this endpoint&401');
  }

  const response = await checkoutServices.checkout(req.body);
  console.log(response);
  res.status(201).json(response);
};

const updateCheckoutById = async (_req, _res) => true;

module.exports = { checkout, updateCheckoutById };
