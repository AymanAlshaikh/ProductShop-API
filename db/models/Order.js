const Orders = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {}, { timestamps: false });

  return Order;
};
module.exports = Orders;
