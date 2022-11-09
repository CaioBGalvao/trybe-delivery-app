const { Sale, Product, User } = require('../../database/models');

const typeUser = {
  customer: 'userId', 
  seller: 'sellerId',
};

const findAll = async ({ role, id }) => Sale.findAll({
  where: { [typeUser[role]]: id },
  attributes: ['id', 'totalPrice', 'saleDate', 'status', 'deliveryAddress', 'deliveryNumber'],
});

const findOne = async (id) => Sale.findByPk(id, { 
  attributes: ['id', 'totalPrice', 'saleDate', 'status'],
  include: [
    {
      model: Product,
      as: 'products',
      attributes: ['name', 'price', 'url_image'],
      through: { attributes: ['quantity'] },
    }, {
      model: User,
      as: 'seller',
      attributes: ['name'],
    },
  ],
});

const patch = async ({ role, id, status, saleId }) => {
  const typeUser = {
    customer: { id: 'userId', status: ['Entregue'] },
    seller: { id: 'sellerId', status: ['Preparando', 'Em Trânsito'] },
  };
  
  const sale = await Sale.findOne({ where: { [typeUser[role].id]: id, id: saleId } });

  if (!sale) {
    throw new Error('You are trying to change a sale that does not exist or is not yours&401');
  }

  if (!typeUser[role].status.some((authStatus) => authStatus !== sale.status)) {
    throw new Error('Invalid status&400');
  }

  return Sale.update({ status }, { where: { [typeUser[role].id]: id, id: saleId } });
};

module.exports = { findAll, findOne, patch };
