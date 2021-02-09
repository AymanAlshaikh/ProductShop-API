const { Product } = require("../db/models");
exports.list = async (req, res) => {
  //res.json(data);
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
};

exports.removeProduct = async (req, res) => {
  const { dataId } = req.params;

  try {
    found = await Product.findByPk(dataId);
    if (found) {
      found.destroy();
      res.status(204);
      res.end();
    } else {
      res.status(404);
      res.json("nothing to delete");
    }
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
};

exports.newProduct = async (req, res) => {
  try {
    const newProducts = await Product.create(req.body);
    res.json(newProducts);
    res.status(201);
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { dataId } = req.params;
  try {
    found = await Product.findByPk(dataId);
    if (found) {
      found.update(req.body);
      res.status(204);
      res.end();
    } else {
      res.status(404);
      res.json("no products to update");
    }
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
};
