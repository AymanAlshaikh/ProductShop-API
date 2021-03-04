const { Product, Shop } = require("../db/models");

exports.fetchProduct = async (dataId, next) => {
  try {
    const found = await Product.findByPk(dataId);
    return found;
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["shopId", "createdAt", "updatedAt"] },
      include: [
        {
          model: Shop,
          attributes: ["name"],
          as: "shop",
        },
      ],
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.removeProduct = async (req, res, next) => {
  try {
    if (req.user.id === req.whatever.userId) {
      await req.whatever.destroy();
      res.status(204);
      res.end();
    } else {
      const error = new Error("UnAuthorized");
      error.status = 400;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// exports.newProduct = async (req, res, next) => {
//   console.log(req.body);
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }
//     const newProducts = await Product.create(req.body);
//     res.status(201);
//     res.json(newProducts);
//   } catch (error) {
//     next(error);
//   }
// };

exports.updateProduct = async (req, res, next) => {
  try {
    if (req.user.id === req.whatever.userId) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      await req.whatever.update(req.body);
      res.json(req.whatever);
    }
    else {
      const error = new Error("UnAuthorized");
      error.status = 400;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
