const { sale, salesProduct, product } = require('../../database/models');
const { Product } = require ('../../database/models');
const findAll = async (id) => {
  const typeUser = {
    customer: "userId", 
    seller: "sellerId",
  }
  const allSales = await sale.findAll({
    where: { userId: id }});
    return allSales;
};

const findOne = async (id) => {
  const saleById = await sale.findOne({
    where: { id }
  });

  const response = await salesProduct.findAll({
    where: { sale_id: id },
  })
  console.log(response)

  const products = response.map((p) => p.dataValues)  

  const resultArray = await Promise.all(products.map(async (p) => {
    const { dataValues } = await product.findOne({
      attributes: ['name', 'price'],
      where: { id: p.productId },
    })
    return dataValues;
  }))

  
  const saleInfo = {
    ...saleById,
    resultArray,
    products,
  }

  console.log(saleInfo);

  

  return saleById;
}

module.exports = { findAll, findOne };
