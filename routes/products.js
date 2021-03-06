const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

const {
  list,
  updateProduct,
  removeProduct,
  newProduct,
  fetchProduct,
} = require("../controllers/productControllers");

router.param("dataId", async (req, res, next, dataId) => {
  const product = await fetchProduct(dataId, next);
  if (product) {
    req.whatever = product;
    next();
  } else {
    next({ status: 404, message: "product not found" });
  }
});

router.get("/", list);

router.delete("/:dataId", passport.authenticate("jwt", { session: false }), removeProduct);

//router.post("/", upload.single("image"), newProduct);

router.put("/:dataId", passport.authenticate("jwt", { session: false }), upload.single("image"), updateProduct);

module.exports = router;
