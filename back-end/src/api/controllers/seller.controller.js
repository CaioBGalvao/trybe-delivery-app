const { sellerServices } = require('../services');

const findAll = async (_req, res) => {
  const sellerUsers = await sellerServices.findAll();
  return res.status(200).json(sellerUsers);
};

module.exports = { findAll };
