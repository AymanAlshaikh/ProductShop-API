const express = require("express");
const router = express.Router();

const {
  list,
  updateProduct,
  removeProduct,
  newProduct,
} = require("../controllers/productControllers");

router.get("/", list);

router.delete("/:dataId", removeProduct);

router.post("/", newProduct);

router.put("/:dataId", updateProduct);

module.exports = router;
