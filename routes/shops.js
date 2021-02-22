const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");
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

router.get("/", passport.authenticate("jwt", { session: false }), list);

router.delete(
  "/:shopId",
  passport.authenticate("jwt", { session: false }),
  removeShop
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  newShop
);
router.post(
  "/:shopId/data",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  newProduct
);

router.put(
  "/:shopId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateShop
);

module.exports = router;
