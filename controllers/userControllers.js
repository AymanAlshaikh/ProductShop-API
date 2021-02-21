const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

//Model
const { User } = require("../db/models");

exports.signUp = async (req, res, next) => {
  const { password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    req.body.password = hashPassword;
    console.log(req.body);
    const newUser = await User.create(req.body);
    res.json(newUser);
    res.status(201);
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, done) => {
  const { user } = req;
  const payload = {
    username: user.username,
    email: user.email,
    firstname: user.firstName,
    lastName: user.lastName,
    exp: Date.now() + 60000,
  };
  const token = jwt.sign(JSON.stringify(payload), "secretkey");
  res.json({ token });
};
