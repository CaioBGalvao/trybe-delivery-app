const { productService } = require('../services');

const productController = {
  findAll: async (_req, res) => {
    const products = await productService.findAll();
    return res.status(200).json(products);
  },
};

module.exports = productController;