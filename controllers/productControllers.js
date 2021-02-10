const { Product } = require("../db/models");

exports.fetchProduct = async (dataId, next) => {
  try {
    const found = await Product.findByPk(dataId);
    return found;
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  //res.json(data);
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    //res.status(500);
    //res.json({ message: error.message });
    next(error);
  }
};

exports.removeProduct = async (req, res, next) => {
  const { dataId } = req.params;

  try {
    //found = await Product.findByPk(dataId);

    await req.whatever.destroy();
    res.status(204);
    res.end();
  } catch (error) {
    //res.status(500);
    //res.json({ message: error.message });
    next(error);
  }
};

exports.newProduct = async (req, res, next) => {
  try {
    const newProducts = await Product.create(req.body);
    res.json(newProducts);
    res.status(201);
  } catch (error) {
    //res.status(500);
    //res.json({ message: error.message });
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { dataId } = req.params;
  try {
    //found = await Product.findByPk(dataId);

    req.whatever.update(req.body);
    res.status(204);
    res.end();
  } catch (error) {
    //res.status(500);
    //res.json({ message: error.message });
    next(error);
  }
};
