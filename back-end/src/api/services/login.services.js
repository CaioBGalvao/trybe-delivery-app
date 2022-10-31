const { users } = require('../../database/models');
const validateLogin = require('../Schemas/login/login.schema');
const { crypto, jwt } = require('../security');

const login = async (userObject) => {
  const validationResult = validateLogin(userObject);

  const { email, password } = validationResult;

  const user = await users.findOne({
    // logging: console.log,
    attributes: ['email', 'password'],
    where: { email },
    raw: true,
  });

  if (!user) {
    throw new Error('Incorrect email or password&404');
  }

  crypto.passwordValidator({ userPassword: password, dbPassword: user.password });

  return jwt.createToken({ email });
};

module.exports = { login };