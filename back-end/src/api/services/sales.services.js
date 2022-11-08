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

const update = async (id, stat) => Sale.update(
  { status: stat },
  { where: {
    id,
  } },
);

module.exports = { findAll, findOne, update };