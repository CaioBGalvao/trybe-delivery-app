module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('salesProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
    },
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName: 'salesProducts',
    underscored: true,
  });

  SaleProduct.associate = (models) => {
    models.sale.belongsToMany(models.product, {
      through: SaleProduct,
      foreignKey: 'saleId',
      as: 'sale_id',
      otherKey: 'productId',
    });
    models.product.belongsToMany(models.sale, {
      through: SaleProduct,
      foreignKey: 'productId',
      as: 'product_id',
      otherKey: 'saleId',
    });
  };

  return SaleProduct;
};