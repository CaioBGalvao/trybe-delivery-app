module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('salesProducts', {
    sale_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName: 'salesProducts',
  });

  // SaleProduct.associate = (models) => {
  //   models.sales.belongsToMany(models.sales, {
  //     through: SaleProduct,
  //     as: 'sales',
  //     foreignKey: 'sale_id',
  //     otherKey: 'product_id'
  //   });

  //   models.products.belongsToMany(models.products, {
  //     through: SaleProduct,
  //     as: 'products',
  //     foreignKey: 'product_id',
  //     otherKey: 'sale_id'
  //   });
  // }

  // Está dando um erro na hora de iniciar o servidor
  return SaleProduct;
}
