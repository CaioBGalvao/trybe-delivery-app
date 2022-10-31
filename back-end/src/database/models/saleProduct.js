module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
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

  SaleProduct.associate = (models) => {
    models.Sales.belongsToMany(models.Sales, {
      as: 'Sales',
      through: SaleProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id'
    });

    models.Product.belongsToMany(models.Product, {
      as: 'Product',
      through: SaleProduct,
      foreignKey: 'product_id',
      otherKey: 'sale_id'
    });
  }

  return SaleProduct;
}
