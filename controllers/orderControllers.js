const { Order, OrderItem } = require("../db/models");

exports.checkout = async (req, res, next) => {
  try {
    const newOrder = await Order.create(
      {
        userId: req.user.id,
      },
      req.body.quantity
    );
    const cart = newOrder.addProducts(req.body.productId);
    // const items = req.body.map((item) => ({
    //   ...item,
    //   orderId: newOrder.id,
    // }));
    // const orderItems = await OrderItem.bulkCreate(items);
    res.status(201);
    res.json({ ...newOrder.toJSON(), ...cart });
  } catch (error) {
    next(error);
  }
};
