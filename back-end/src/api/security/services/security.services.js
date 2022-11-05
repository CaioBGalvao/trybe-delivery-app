const { User } = require('../../../database/models');

const roleVerify = async ({ email }) => {
  const findedRole = await User.findOne({
    attributes: ['role', 'id'],
    where: { email },
    raw: true,
  });
  return findedRole;
};

module.exports = { roleVerify };