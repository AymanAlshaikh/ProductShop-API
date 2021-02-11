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
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.removeProduct = async (req, res, next) => {
  const { dataId } = req.params;

  try {
    await req.whatever.destroy();
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};

exports.newProduct = async (req, res, next) => {
  try {
    const newProducts = await Product.create(req.body);
    res.json(newProducts);
    res.status(201);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { dataId } = req.params;
  try {
    req.whatever.update(req.body);
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
