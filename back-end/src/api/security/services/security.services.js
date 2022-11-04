const { user } = require('../../../database/models');

const roleVerify = async ({ email }) => {
  const findedRole = await user.findOne({
    // logging: console.log,
    attributes: ['role', 'id'],
    where: { email },
    raw: true,
  });
  return findedRole;
};

module.exports = { roleVerify };