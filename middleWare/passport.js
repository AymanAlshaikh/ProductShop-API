const { User } = require("../db/models");

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username } });
    let passowrdMatch;
    if (user) {
      passowrdMatch = await bcrypt.compare(password, user.password);
      if (passowrdMatch) return done(null, user);
      else return done(null, false);
    } else return done(null, false);
  } catch (error) {
    done(error);
  }
});
