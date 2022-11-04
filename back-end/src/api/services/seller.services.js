const { User } = require('../../database/models');

const getAllSellerUsers = async () => {
  const sellerUsers = await User.findAll({
    where: { roles: seller },
  });
  
  if(!sellerUsers) throw new Error('There are no registered sellers&404')

  return sellerUsers;
};

module.exports = { getAllSellerUsers };
