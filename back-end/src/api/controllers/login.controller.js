const { loginService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;
  const userObject = { email, password };
  const result = await loginService.login(userObject);
  return res.status(200).json({ ...result });
};
const create = async (req, res) => {
  const { name, email, password } = req.body;
  const newUserObject = { name, email, password };
  await loginService.create(newUserObject);
  return res.status(201).json({ menssage: 'User Created' });
};

module.exports = { login, create };
