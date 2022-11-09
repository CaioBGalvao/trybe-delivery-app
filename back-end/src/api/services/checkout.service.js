const { Sale, saleProduct } = require('../../database/models');
const validateCheckout = require('../schemas/checkout/checkout.schema');

const dateFormater = (saled) => {
  const date = saled.saleDate.toISOString().split('T')[0];
  return date.split('-').reverse().join('/');
};

const create = async (obj) => {
  const validatedObj = validateCheckout(obj);

  const { salesProducts, ...checkoutInfo } = validatedObj;

  const sold = await Sale.create({ ...checkoutInfo, status: 'Pendente' });

  const saledProducts = await Promise
    .all(salesProducts
      .map((product) => saleProduct
        .create({ saleId: sold.id.toString(), ...product })));

  const response = {
    saleId: sold.id.toString(),
    saleDate: dateFormater(sold),
    totalPrice: sold.totalPrice,
    status: sold.status.toString(),
    saledProducts,
  };

  return response;
};

module.exports = { create, patch };