module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('saleProduct', {
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
    tableName: 'saleProduct',
  });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Sales, {
      as: 'sales',
      foreignKey: 'sale_id',
    });

    models.Product.belongsToMany(models.Product, {
      as: 'product',
      foreignKey: 'product_id',
    });
  }

  return Product;
}
