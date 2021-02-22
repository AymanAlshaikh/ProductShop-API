const { User } = require("../db/models");
const JWTStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
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

exports.jwtStrategy = new JWTStrategy(
  { jwtFromRequest: fromAuthHeaderAsBearerToken(), secretOrKey: "secretkey" },
  async (jwtPayload, done) => {
    if (jwtPayload.exp < Date.now()) {
      return done(null, false);
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      console.log(user);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
