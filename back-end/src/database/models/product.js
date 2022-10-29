module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT(4,2),
    url_image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'products',
  });

  Product.associate = (models) => {
    Product.hasMany(models.Sales, {
      foreignKey: 'product_id',
      as: 'product'
    });
  }

  return Product;
}
