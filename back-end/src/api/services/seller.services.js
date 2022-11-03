const { user } = require('../../database/models');

const findAll = async () => {
  const sellers = await user.findAll({
    where: { role: 'seller' },
  });
  
  if (!sellers) throw new Error('There are no registered sellers&404');

  return sellers;
};

module.exports = { findAll };
