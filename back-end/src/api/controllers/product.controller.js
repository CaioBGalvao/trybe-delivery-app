const { productServices } = require('../services');

const getAll = async (_req, res) => {
  const products = await productServices.getAll();
  return res.status(200).json(products);
};

module.exports = { getAll };