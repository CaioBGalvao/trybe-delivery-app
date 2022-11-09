const { Sale, Product, User, saleProduct } = require('../../database/models');
const validateCheckout = require('../schemas/checkout/checkout.schema');

const salesService = {
  typeUser: {
    customer: { id: 'userId', status: ['Entregue'] },
    seller: { id: 'sellerId', status: ['Preparando', 'Em Trânsito'] },
  },
  dateFormater: (obj) => {
    const date = obj.saleDate.toISOString().split('T')[0];
    return date.split('-').reverse().join('/');
  },

  create: async (obj) => {
    const validatedObj = validateCheckout(obj);
  
    const { salesProducts, ...checkoutInfo } = validatedObj;
  
    const sold = await Sale.create({ ...checkoutInfo, status: 'Pendente' });
  
    const saledProducts = await Promise
      .all(salesProducts
        .map((product) => saleProduct
          .create({ saleId: sold.id.toString(), ...product })));
  
    const response = {
      saleId: sold.id.toString(),
      saleDate: this.dateFormater(sold),
      totalPrice: sold.totalPrice,
      status: sold.status.toString(),
      saledProducts,
    };
  
    return response;
  },
  findAll: async ({ role, id }) => Sale.findAll({
    where: { [this.typeUser[role].id]: id },
    attributes: ['id', 'totalPrice', 'saleDate', 'status', 'deliveryAddress', 'deliveryNumber'],
  }),
  findOne: async (id) => Sale.findByPk(id, { 
    attributes: ['id', 'totalPrice', 'saleDate', 'status'],
    include: [
      {
        model: Product,
        as: 'products',
        attributes: ['name', 'price', 'url_image'],
        through: { attributes: ['quantity'] },
      }, {
        model: User,
        as: 'seller',
        attributes: ['name'],
      },
    ],
  }),
  patch: async ({ role, id, status, saleId }) => {
    const sale = await Sale.findOne({ where: { [this.typeUser[role].id]: id, id: saleId } });
  
    if (!sale) {
      throw new Error('You are trying to change a sale that does not exist or is not yours&401');
    }
  
    if (!this.typeUser[role].status.some((authStatus) => authStatus !== sale.status)) {
      throw new Error('Invalid status&400');
    }
  
    return Sale.update({ status }, { where: { [this.typeUser[role].id]: id, id: saleId } });
  },
};

module.exports = salesService;
