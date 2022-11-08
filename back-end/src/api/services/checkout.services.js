const { Sale, saleProduct } = require('../../database/models');
const validateCheckout = require('../schemas/checkout/checkout.schema');

const typeUser = {
  customer: { id: 'userId', status: ['Entregue'] },
  seller: { id: 'sellerId', status: ['Preparando', 'Em Trânsito'] },
};

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

const patch = async ({ role, id, status, saleId }) => {
  const sale = await Sale.findOne({ where: { [typeUser[role].id]: id, id: saleId } });

  if (!sale) {
    throw new Error('You are trying to change a sale that does not exist or is not yours&401');
  }

  if (!typeUser[role].status.some((statusAuth) => statusAuth !== sale.status)) {
    throw new Error('Invalid status&400');
  }

  return Sale.update({ status }, { where: { [typeUser[role].id]: id, id: saleId } });
};

module.exports = { checkout, patch };