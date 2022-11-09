const { User } = require('../../database/models');
const validateLogin = require('../schemas/login/login.schema');
const validateNewUser = require('../schemas/login/create.schema');
const { crypto, jwt } = require('../security');

const login = async (userObject) => {
  const validationResult = validateLogin(userObject);

  const { email, password } = validationResult;

  const findedUser = await User.findOne({
    // logging: console.log,
    attributes: ['id', 'name', 'email', 'password', 'role'],
    where: { email },
    raw: true,
  });

  if (!findedUser) throw new Error('Incorrect email or password&404');

  crypto.passwordValidator({ userPassword: password, dbPassword: findedUser.password });

  const apiReturn = {
    ...findedUser,
    token: jwt.createToken({ email }),
  };
  
  return apiReturn;
};

const create = async (newUserObject) => {
  const validationResult = validateNewUser(newUserObject);

  const { name, email, password } = validationResult;

  const encriptedPassword = crypto.encriptPassword(password);

  const newUserDbResponse = await User.findOrCreate({
    where: { email },
    defaults: {
      name,
      email,
      password: encriptedPassword,
      role: 'customer',
    },
  });

  if (!newUserDbResponse[1]) {
    throw new Error('Email already registered&409');
  }

  return true;
};

module.exports = { login, create };