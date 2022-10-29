import { loginService } from '../services';

const login = async (req, res) => {
  const { email, password } = req.body;
  const userObject = { email, password };
  const result = await loginService.login(userObject);
  return res.status(200).json({ token: result });
};
const create = async (_req, _res) => {};

export { login, create };
