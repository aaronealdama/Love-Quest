const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // API routes for accessing users

  // Route for creating new users into the database
  app.post("/api/users", function (req, res) {
    const username = req.body.username;
    db.User.findAll({
      where: {
        username: username,
      },
    }).then(function (dbAuth) {
      console.log(dbAuth);
      if (dbAuth.length) {
        return res.send(false);
      } else {
        db.User.create(req.body).then(function (dbUser) {
          return res.send(true);
        });
      }
    });
  });

  // Route for deleting users
  app.delete("/api/users/:id", function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Route for authenticating login
  app.post("/api/auth", passport.authenticate("local"), function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    db.User.findOne({
      where: {
        username: username,
        password: password,
        has_profile: false,
      },
    }).then(function (dbUser) {
      if (dbUser === null) {
        res.send(false);
      } else {
        res.send(true);
      }
    });
  });

  // Route for creating a user's profile
  app.post("/api/profiles", function (req, res) {
    db.Profile.create(req.body).then(function (dbProfile) {
      res.json(dbProfile);
    });
  });

  // Route for getting user profile information
  app.post("/api/user/profile", passport.authenticate("local"), function (
    req,
    res
  ) {
    const username = req.body.username;

    db.Profile.findOne({
      where: {
        email: username,
      },
    }).then(function (dbProfile) {
      console.log(dbProfile);
      if (dbProfile === null) {
        res.send(false);
      } else {
        res.send(true);
      }
    });
  });

  // Route for updating user's has_profile value
  app.put("/api/update", function (req, res) {
    const username = req.body.email;
    const update = { has_profile: true };
    db.User.update(update, {
      where: { username: username },
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Route for logging out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};
