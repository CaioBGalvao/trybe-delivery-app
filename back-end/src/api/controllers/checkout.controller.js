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

const sellerStatus = async (req, sellerId) => {
  const { id: saleId } = req.params;
  const { status } = req.body;
  await securityServices.saleOwnerVerify({ role: 'seller', id: sellerId, saleId });
  const response = await checkoutServices.sellerCheckout(saleId, status);
  return response;
};
// Function Comum
const customerStatus = async (req, userId) => {
  const { id: saleId } = req.params;
  const { status } = req.body;
  await securityServices.saleOwnerVerify({ role: 'customer', id: userId, saleId });
  const response = await checkoutServices.customerCheckout(saleId, status);
  return response;
};
// middleware Express
const decisionMaker = async (req, res) => {
  const { email } = req.body;
  const { role, id: userId } = await securityServices.roleVerify(email);
  if (role === 'seller') {
    const response = await sellerStatus(req, userId);
    return res.status(200).json({ message: response });
  }
  if (role === 'customer') {
    const response = await customerStatus(req, userId);
    return res.status(200).json({ message: response });
  }
  throw new Error('Your role does not allow you to access this endpoint&401');
};

module.exports = { checkout, decisionMaker };
