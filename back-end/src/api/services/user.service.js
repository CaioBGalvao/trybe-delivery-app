const { User } = require('../../database/models');
const validateLogin = require('../schemas/login/login.schema');
const validateNewUser = require('../schemas/login/create.schema');
const { crypto, jwt } = require('../security');

const userService = {
  create: async (user) => {
    const userValidate = validateNewUser(user);

    const { name, email, password, role } = userValidate;

    const encriptedPassword = crypto.encriptPassword(password);

    const created = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        email,
        password: encriptedPassword,
        role: role || 'customer',
      },
    });

    if (!created[1]) throw new Error('Email already registered&409');

    return true;
  },
  login: async (user) => {
    const loginValidate = validateLogin(user);

    const { email, password } = loginValidate;

    const finded = await User.findOne({
      where: { email },
      raw: true,
    });

    if (!finded) throw new Error('Incorrect email or password&404');

    crypto.passwordValidator({ userPassword: password, dbPassword: finded.password });

    return {
      ...finded,
      token: jwt.createToken({ email }),
    };
  },
  findAll: async () => User.findAll(),
  findById: async (id) => User.findByPk(id),
  findAllSellers: async () => User.findAll({ 
    where: { role: 'seller' }, 
    attributes: ['id', 'name'], 
  }),
};

module.exports = userService;