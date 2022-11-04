const { sellerServices } = require('../services');


const getAllSellerUsers = async (_req, res) => {
  const sellerUsers = await sellerServices.getAllSellerUsers();
  return res.status(200).json(sellerUsers);
};

module.exports = { findAll };
