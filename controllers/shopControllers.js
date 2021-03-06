const { Shop, Product } = require("../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const found = await Shop.findByPk(shopId);
    return found;
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
    });
    res.json(shops);
  } catch (error) {
    next(error);
  }
};

exports.removeShop = async (req, res, next) => {
  try {
    await req.whatever.destroy();
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};

exports.newShop = async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const found = await Shop.findOne({ where: { userId: req.user.id } });
    console.log(found);
    if (found) {
      const error = new Error("عندك دكان");
      error.status = 400;
      next(error);
    } else {
      req.body.userId = req.user.id;
      const newShops = await Shop.create(req.body);
      res.status(201);
      res.json(newShops);
    }
  } catch (error) {
    next(error);
  }
};

exports.newProduct = async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.user.id === req.whatever.userId) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      req.body.shopId = req.whatever.id;
      const newProducts = await Product.create(req.body);
      res.status(201);
      res.json(newProducts);
    } else {
      const error = new Error("UnAuthorized");
      error.status = 400;
      next(error);
    }

    // if (req.file) {
    //   req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    // }
    // req.body.shopId = req.whatever.id;
    // const newProducts = await Product.create(req.body);
    // res.status(201);
    // res.json(newProducts);
  } catch (error) {
    next(error);
  }
};

exports.updateShop = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.whatever.update(req.body);
    res.json(req.whatever);
  } catch (error) {
    next(error);
  }
};
