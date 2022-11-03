const { sale, salesProduct } = require('../../database/models');

const checkout = async (obj) => {
  const { salesProducts, ...checkoutInfo } = obj;

  const saled = await sale.create(checkoutInfo);

  await salesProducts
    .forEach(async (product) => salesProduct.create({ saleId: saled.id, ...product }));

  return true;
};

module.exports = { checkout };