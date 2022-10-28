module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT(decimals=2),
    url_image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'products',
  });

  // product.associate = (models) => {
  //   product.hasMany(models.BlogPost, {
  //     foreignKey: 'product_id',
  //     as: 'blogposts'
  //   })
  // }

  return Product;
}
