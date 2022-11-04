module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    createdAt: 'sale_date',
    updatedAt: false,
    tableName: 'sales',
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user_id',
    });
    Sale.belongsTo(models.user, {
      foreignKey: 'sellerId',
      as: 'seller_id',
    });
  };

  return Sale;
};
