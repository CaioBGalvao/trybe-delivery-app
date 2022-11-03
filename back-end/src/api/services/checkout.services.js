const { sale, salesProduct } = require('../../database/models');

const newSales = (objSales) => {
  const verifiedSales = validateSales(objSales);

  const createSalesResponse = sale.create({
    userId: verifiedSales.userId,
    sellerId: verifiedSales.sellerId,
    deliveryAddress: verifiedSales.deliveryAddress,
    deliveryNumber: verifiedSales.deliveryNumber,
    totalPrice: verifiedSales.totalPrice,
    saleDate: new Date(),
  });

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
//  "saleDate": "22-07-2022"
// }
