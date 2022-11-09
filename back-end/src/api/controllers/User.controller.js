const { userService } = require('../services'); 

const userController = {
  create: async (req, res) => {
    await userService.create(req.body);
    return res.status(201).json({ menssage: 'User Created' });
  },
  login: async (req, res) => {
    const result = await userService.login(req.body);
    return res.status(200).json(result);
  },

  findAll: async (req, res) => {
    const users = await userService.findAll();
    return res.status(200).json(users);
  },
  findById: async (req, res) => {
    const { id } = req.params;
    const user = await userService.findById(id);

    if (!user) res.status(404).json({ message: 'User not found' });
  
    return res.status(200).json(user);
  },
  findAllSellers: async (req, res) => {
    const sellers = await userService.findAllSellers();
    return res.status(200).json(sellers);
  },
  delete: async (req, res) => {
    const result = await userService.delete(req.params);

    if (!result) return res.status(404).json({ message: 'User not found' });

    return res.status(204).end();
  },
};

module.exports = userController;