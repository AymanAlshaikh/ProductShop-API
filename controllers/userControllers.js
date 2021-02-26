const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

//Model
const { User } = require("../db/models");

exports.signUp = async (req, res, next) => {
  console.log(req.body);
  const { password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    req.body.password = hashPassword;
    console.log(req.body);
    const newUser = await User.create(req.body);
    res.json({token});
    res.status(201);
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, done) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    password:user.password,
    // email: user.email,
    // firstname: user.firstName,
    // lastName: user.lastName,
    exp: Date.now() + 6000000,
  };
  const token = jwt.sign(JSON.stringify(payload), "secretkey");
  res.json({ token });
};
