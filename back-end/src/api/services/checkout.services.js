const { sale, salesProduct } = require('../../database/models');
const validateCheckout = require('../schemas/checkout/checkout.schema');

const dateFormater = (saled) => {
  const date = saled.saleDate.toISOString().split('T')[0];
  return date.split('-').reverse().join('/');
};

const checkout = async (obj) => {
  const validatedObj = validateCheckout(obj);

  const { salesProducts, ...checkoutInfo } = validatedObj;

  const saled = await sale.create({ ...checkoutInfo, status: 'Pendente' });

  const saledProducts = await Promise
    .all(salesProducts
      .map((product) => salesProduct
        .create({ saleId: saled.id.toString(), ...product })));

  const response = {
    saleId: saled.id.toString(),
    saleDate: dateFormater(saled),
    totalPrice: saled.totalPrice,
    status: saled.status.toString(),
    saledProducts,
  };

  return response;
};

module.exports = { checkout };