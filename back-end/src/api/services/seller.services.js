const { user } = require('../../database/models');

const getAllSellerUsers = async () => {
  const sellerUsers = await user.findAll({
    attributes: ['id', 'name'],
    where: { role: 'seller' },
  });
  
  if (!sellerUsers) throw new Error('There are no registered sellers&404');

  return sellerUsers;
};

module.exports = { getAllSellerUsers };
