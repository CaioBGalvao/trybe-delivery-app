const { Product } = require('../../database/models');

const productService = {
  findAll: async () => Product.findAll(),
};

module.exports = productService;