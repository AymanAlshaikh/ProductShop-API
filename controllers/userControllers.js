const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Model
const { User } = require("../db/models");

exports.signUp = async (req, res, next) => {
  const { password } = req.body;
  try {
    const hashedPassowrd = await bcrypt.hash(password, 10);
    req.body.password = hashedPassowrd;
    const newUser = await User.create(req.body);

    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + 6000000,
    };
    const token = jwt.sign(JSON.stringify(payload), "secretkey");
    res.status(201);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, done) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    password: user.password,
    // email: user.email,
    // firstname: user.firstName,
    // lastName: user.lastName,
    exp: Date.now() + 6000000,
  };
  const token = jwt.sign(JSON.stringify(payload), "secretkey");
  res.json({ token });
};
