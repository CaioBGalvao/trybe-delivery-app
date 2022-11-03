const { Product } = require('../../database/models');

const getAll = async () => {
  const products = await Product.findAll();

  if (!products) throw new Error('Could not find any products&404');

  return products;
};

module.exports = { getAll };