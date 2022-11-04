const { sale, salesProduct } = require('../../database/models');
const validateSales = require('../Schemas/checkout/checkout.schema');

const newSales = (objSales) => {
  const verifiedSales = validateSales(objSales);

  const createSalesResponse = sale.create({
    userId: verifiedSales.userId,
    sellerId: verifiedSales.sellerId,
    deliveryAddress: verifiedSales.deliveryAddress,
    deliveryNumber: verifiedSales.deliveryNumber,
    totalPrice: verifiedSales.totalPrice,
    status: 'Pendente',
  });

  console.log('Resposta da API', createSalesResponse);

  // if (createSalesResponse[1] === false) {
  //   throw new Error('Erro ao criar nova venda&500');
  // }
  return createSalesResponse;
};

// "userId": "1",
//  "sellerId": "1",
//  "salesProducts": [
//    {
//      "productId": "1",
//      "quantity": "1"
//    },
//    {
//      "productId": "2",
//      "quantity": "2"
//    }
//  ],
//  "deliveryAddress": "Rua do Bobo",
//  "deliveryNumber": "0",
//  "totalPrice": '100.24',
// }
