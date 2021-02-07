const express = require("express");
const data = require("./data");
const app = express();

app.get("/data", (req, res) => {
  res.json(data);
});

app.listen(8000, () => {
  console.log("running");
});
