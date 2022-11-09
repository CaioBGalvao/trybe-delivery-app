const { salesService } = require('../services');
const securityServices = require('../security/services/security.services');

const salesController = {
  create: async (req, res) => {
    const { email, ...checkoutObj } = req.body;
    const { role } = await securityServices.roleVerify(email);
    if (role !== 'customer') {
      throw new Error('Only customers can access this endpoint&401');
    }
  
    const response = await salesService.create(checkoutObj);
    res.status(201).json(response);
  },
  findAll: async (req, res) => {
    const { email } = req.body;
    const user = await securityServices.roleVerify(email);
    const sales = await salesService.findAll(user); 
    return res.status(200).json(sales);
  },
  findById: async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.findById(id);

    console.log(sale);
  
    if (!sale) res.status(404).json({ message: 'Sale not found' });
  
    return res.status(200).json(sale);
  },
  patch: async (req, res) => {
    const { id: saleId } = req.params;
    const { email, status } = req.body;
  
    const user = await securityServices.roleVerify(email);
    const [response] = await salesService.patch({ ...user, status, saleId });
  
    if (!response) throw new Error(`Status is already ${status}&400`);
  
    return res.status(200).json(status);
  },
};

module.exports = salesController;
