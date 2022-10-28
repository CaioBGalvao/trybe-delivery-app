const Sales = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, foreignKey: true },
    seller_id: { type: DataTypes.INTEGER, foreignKey: true },
    total_price: DataTypes.INTEGER,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'sales',
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Sales.belongsTo(models.User, {
      foreignKey: 'seller_id',
      as: 'user',
    });
    Sales.hasMany(models.SaleProduct, {
      foreignKey: 'sale_id',
      as: 'saleProduct',
    });
  }
  return Sales;
}

module.exports = Sales;
