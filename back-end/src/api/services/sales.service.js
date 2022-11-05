const { Sale, Product, User } = require('../../database/models');

const typeUser = {
  customer: 'userId', 
  seller: 'sellerId',
};

const findAll = async ({ role, id }) => Sale.findAll({ where: { [typeUser[role]]: id } });

const findOne = async (id) => {
  const findSale = Sale.findByPk(id, { 
    include: [{
      model: Product,
      as: 'products',
      through: { attributes: ['quantity'] },
    }, {
      model: User,
      as: 'seller',
      attributes: ['name'],
    }],
  });

  return findSale;
};
module.exports = { findAll, findOne };
