const { sale } = require('../../database/models');

const findAll = async ({ role, id }) => {
  const typeUser = {
    customer: "userId", 
    seller: "sellerId",
  }
  const allSales = await sale.findAll({
    where: { [typeUser[role]]: id }});
    return allSales;
};

module.exports = { findAll };
