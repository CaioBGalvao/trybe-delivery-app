const { User } = require('../models');

const getAllSellerUsers = async () => {
  const sellerUsers = await User.findAll({
    where: { roles: seller },
  });
  return sellerUsers;
};

module.exports = { getAllSellerUsers };