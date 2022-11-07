const { Sale, saleProduct } = require('../../database/models');
const validateCheckout = require('../schemas/checkout/checkout.schema');

const statusSeller = [
  'Preparando',
  'Em Trânsito',
];

const dateFormater = (saled) => {
  const date = saled.saleDate.toISOString().split('T')[0];
  return date.split('-').reverse().join('/');
};

const checkout = async (obj) => {
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

const sellerCheckout = async (saleId, status) => {
  if (!statusSeller.some((authStatus) => authStatus === status)) {
    throw new Error('Invalid status&400');
  }
  const updated = await Sale.update({ status }, { where: { id: saleId } });
  if (updated[0] === 0) {
    throw new Error(`Status is already ${status}&400`);
  }
  const response = `status was updated to ${status}`;
  return response;
};

const customerCheckout = async (saleId, status) => {
  if (status !== 'Entregue') {
    throw new Error('Invalid status&400');
  }
  const updated = await Sale.update({ status }, { where: { id: saleId } });
  if (updated[0] === 0) {
    throw new Error(`Status is already ${status}&400`);
  }
  const response = `status was updated to ${status}`;
  return response;
};

module.exports = { checkout, sellerCheckout, customerCheckout };