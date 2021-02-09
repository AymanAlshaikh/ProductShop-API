const express = require("express");
let data = require("./data");
const { sequelize } = require("./db/models");
const db = require("./db/models");
const { Product } = require("./db/models");
const app = express();

app.use(express.json());

app.get("/data", async (req, res) => {
  //res.json(data);
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});

app.delete("/data/:dataId", async (req, res) => {
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
});

app.post("/data", async (req, res) => {
  try {
    const newProducts = await Product.create(req.body);
    res.json(newProducts);
    res.status(201);
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});

app.put("/data/:dataId", async (req, res) => {
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
});
//db.authenticate();

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();

/*app.listen(8000, () => {
  console.log("running");
});*/
