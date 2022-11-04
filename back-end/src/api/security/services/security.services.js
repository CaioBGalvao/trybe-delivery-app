const { user, sale } = require('../../../database/models');

const roleVerify = async ({ email }) => {
  const foundRole = await user.findOne({
    // logging: console.log,
    attributes: ['role', 'id'],
    where: { email },
    raw: true,
  });
  return foundRole;
};

const saleOwnerVerify = async ({ sellerId, saleId }) => {
  const foundSale = await sale.findAll({
    // logging: console.log,
    attributes: ['id'],
    where: { sellerId },
    raw: true,
  });
  const saleExist = foundSale.some((sales) => sales.id === Number(saleId));
  if (!saleExist) {
    throw new Error('You are trying to change a sale that does not exist or is not yours&401');
  }
  return saleExist;
};

module.exports = { roleVerify, saleOwnerVerify };