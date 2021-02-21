const express = require("express");
const passport = require("passport");
const router = express.Router();

//Controller
const { signUp, signIn } = require("../controllers/userControllers");

router.post("/signup", signUp);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);

module.exports = router;
