module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('salesProduct', {
    sale_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
    },
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName: 'salesProducts',
  });

  SalesProduct.associate = (models) => {
    models.sale.belongsToMany(models.product, {
      through: SalesProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
    models.product.belongsToMany(models.sale, {
      through: SalesProduct,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  };

  return SalesProduct;
};