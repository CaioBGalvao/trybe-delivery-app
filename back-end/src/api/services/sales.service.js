const { Sale, SaleProduct } = require('../../database/models');

const typeUser = {
  customer: 'userId', 
  seller: 'sellerId',
};

const findAll = async ({ role, id }) => Sale.findAll({ where: { [typeUser[role]]: id } });

const findOne = async ({ id }, saleId) => {
  const findSale = SaleProduct.findAll({ 
    where: { saleId },
    include: {
      model: Sale,
    },
  });

  return findSale;
};
module.exports = { findAll, findOne };
