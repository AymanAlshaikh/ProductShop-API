const { Order, OrderItem } = require("../db/models");

exports.checkout = async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      userId: req.user.id,
    });

    const items = req.body.map((item) => ({
      ...item,
      orderId: newOrder.id,
    }));

    const orderItems = await OrderItem.bulkCreate(items);
    res.status(201);
    res.json(orderItems);
  } catch (error) {
    next(error);
  }
};
