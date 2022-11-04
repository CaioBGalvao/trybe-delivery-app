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

const sellerStatus = async (req, res, sellerId) => {
  const { id } = req.params;
  const saleId = id;
  const { status } = req.body;
  await securityServices.saleOwnerVerify({ sellerId, saleId });
  const response = await checkoutServices.sellerCheckout(saleId, status);
  res.status(200).json({ message: response });
};

const decisionMaker = async (req, res) => {
  const { email } = req.body;
  const { role, id } = await securityServices.roleVerify(email);
  const userId = id;
  if (role === 'seller') {
    await sellerStatus(req, res, userId);
  }
  if (role === 'customer') {
    return true;
  }
  throw new Error('Your role does not allow you to access this endpoint&401');
};

const constumerCheckout = async (_req, _res) => true;

module.exports = { checkout, decisionMaker, constumerCheckout };
