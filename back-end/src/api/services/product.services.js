const { product } = require('../../database/models');

const getAll = async () => {
  const products = await product.findAll();

  if (!products) {
    throw new Error('Could not find any products&404');
  }

  return products;
};

module.exports = { getAll };