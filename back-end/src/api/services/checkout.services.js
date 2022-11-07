const { Sale, saleProduct } = require('../../database/models');
const validateCheckout = require('../schemas/checkout/checkout.schema');

const dateFormater = (saled) => {
  const date = saled.saleDate.toISOString().split('T')[0];
  return date.split('-').reverse().join('/');
};

const checkout = async (obj) => {
  const validatedObj = validateCheckout(obj);

  const { salesProducts, ...checkoutInfo } = validatedObj;

  const sold = await sale.create({ ...checkoutInfo, status: 'Pendente' });

  const saledProducts = await Promise
    .all(salesProducts
      .map((product) => salesProduct
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

const sellerCheckout = async (saleId, status) => {
  const updated = await sale.update({ status }, { where: { id: saleId } });
  if (updated[0] === 0) {
    throw new Error(`Status is already ${status}&400`);
  }
  const response = `status was updated to ${status}`; 
  return response;
};

module.exports = { checkout, sellerCheckout };