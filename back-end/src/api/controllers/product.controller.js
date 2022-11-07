const { productServices } = require('../services');

const findAll = async (_req, res) => {
  const products = await productServices.findAll();
  return res.status(200).json(products);
};

module.exports = { findAll };