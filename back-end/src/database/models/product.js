module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT(4, 2),
    url_image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'products',
  });

  return Product;
};
