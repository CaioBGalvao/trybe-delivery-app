const { User } = require('../../../database/models');

const roleVerify = async ({ email }) => {
  const foundRole = await User.findOne({
    attributes: ['role', 'id'],
    where: { email },
    raw: true,
  });
  return foundRole;
};

module.exports = { roleVerify };