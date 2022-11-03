const { User } = require('../../database/models');

const findAll = async () => {
  const sellers = await User.findAll({
    where: { role: 'seller' },
  });
  
  if (!sellers) throw new Error('There are no registered sellers&404');

  return sellers;
};

module.exports = { findAll };
