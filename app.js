const express = require("express");

const db = require("./db/models");

const app = express();
const routes = require("./routes/products");
app.use(express.json());
app.use("/data", routes);

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
