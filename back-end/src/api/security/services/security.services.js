const { User, Sale } = require('../../../database/models');

const typeColumn = {
  customer: 'userId',
  seller: 'sellerId',
};

const roleVerify = async ({ email }) => {
  const foundRole = await User.findOne({
    attributes: ['role', 'id'],
    where: { email },
    raw: true,
  });
  return foundRole;
};

const saleOwnerVerify = async ({ role, id, saleId }) => {
  const foundSale = await Sale.findAll({
    attributes: ['id'],
    where: { [typeColumn[role]]: id },
    raw: true,
  });
  const saleExist = foundSale.some((sales) => sales.id === Number(saleId));
  if (!saleExist) {
    throw new Error('You are trying to change a sale that does not exist or is not yours&401');
  }
  return saleExist;
};

module.exports = { roleVerify, saleOwnerVerify };