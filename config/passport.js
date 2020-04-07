const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

passport.use(
  new LocalStrategy(function (username, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        username: username,
        password: password,
      },
    }).then(function (dbUser) {
      // If there's no user with the given username
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email.",
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

module.exports = passport;
