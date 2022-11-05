const { User } = require('../../database/models');

const findAll = async () => {
  const sellerUsers = await User.findAll({
    attributes: ['id', 'name'],
    where: { role: 'seller' },
  });
  
  if (!sellerUsers) throw new Error('There are no registered sellers&404');

  return sellerUsers;
};

module.exports = { findAll };
