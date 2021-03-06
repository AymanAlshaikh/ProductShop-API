const OrderItems = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    { timestamps: false }
  );

  return OrderItem;
};
module.exports = OrderItems;
