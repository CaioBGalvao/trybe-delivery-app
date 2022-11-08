const { checkoutServices } = require('../services');
const securityServices = require('../security/services/security.services');

const checkout = async (req, res) => {
  const { email, ...checkoutObj } = req.body;
  const { role } = await securityServices.roleVerify(email);
  if (role !== 'customer') {
    throw new Error('Only customers can access this endpoint&401');
  }

  const response = await checkoutServices.checkout(checkoutObj);
  res.status(201).json(response);
};

const patch = async (req, res) => {
  console.log(res.body);
  const { id: saleId } = req.params;
  const { email, status } = req.body;

  const user = await securityServices.roleVerify(email);
  const [response] = await checkoutServices.patch({ ...user, status, saleId });

  if (!response) throw new Error('Status already update');

  return res.status(200).json({ message: `status was updated to ${status}` });
};

module.exports = { checkout, patch };
