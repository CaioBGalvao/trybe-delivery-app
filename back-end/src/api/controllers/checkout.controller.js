const { checkoutService } = require('../services');

const newSales = async (req, res) => {
  const result = await checkoutService.newSales(req.body);
  return res.status(201).json(result);
};

const vendingStatus = async (_req, _res) => true;

const arrivedStatus = async (_req, _res) => true;

module.exports = {
  newSales,
  vendingStatus,
  arrivedStatus,
};