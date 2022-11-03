const { loginService } = require('../services');

const login = async (req, res) => {
  const result = await loginService.login(req.body);
  return res.status(200).json({ ...result });
};
const create = async (req, res) => {
  await loginService.create(req.body);
  return res.status(201).json({ menssage: 'User Created' });
};

module.exports = { login, create };
