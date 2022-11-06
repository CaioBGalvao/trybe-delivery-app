const { salesService } = require('../services');
const securityServices = require('../security/services/security.services');
const { ConsoleMessage } = require('puppeteer');

const findAll = async (req, res) => {
  // const { email } = req.headers;
  const { id } = req.params;
  // const result = await securityServices.roleVerify(email);
  const allSales = await salesService.findAll(id);
  return res.status(200).json(allSales);
};

const findOne = async (req, res) => {
  const { id } = req.params;
  const allSales = await salesService.findOne(id);
  return res.status(200).json(allSales);
};


module.exports = { findAll, findOne };
