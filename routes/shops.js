const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const {
  list,
  updateShop,
  removeShop,
  newShop,
  fetchShop,
  newProduct,
} = require("../controllers/shopControllers");

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.whatever = shop;
    next();
  } else {
    next({ status: 404, message: "shop not found" });
  }
});

router.get("/", list);

router.delete("/:shopId", removeShop);

router.post("/", upload.single("image"), newShop);
router.post("/:shopId/data", upload.single("image"), newProduct);

router.put("/:shopId", upload.single("image"), updateShop);

module.exports = router;
