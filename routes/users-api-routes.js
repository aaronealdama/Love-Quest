// Models and middleware
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
    console.log(req.file);
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

  // Route for getting users based on data submitted
  app.post("/api/users/profiles", function (req, res) {
    const option = req.body.option;
    const value = req.body.value;
    const gender = req.body.gender;
    db.Profile.findAll({
      where: {
        [option]: value,
        sex: gender,
      },
    }).then(function (dbProfile) {
      let emptyArr = [];
      if (dbProfile !== null) {
        for (let i = 0; i < dbProfile.length; i++) {
          if (dbProfile[i].dataValues.email === req.user.username) continue;
          emptyArr.push(dbProfile[i]);
        }
      }
      res.send(emptyArr);
    });
  });

  // Route to get users by location
  app.post("/api/location", function (req, res) {
    const option = req.body.input;
    const location = req.body.location;

    db.Profile.findAll({
      where: {
        [option]: location,
      },
    }).then(function (dbProfile) {
      res.send(dbProfile);
    });
  });

  //Route for retrieving specific user
  // information
  app.get("/api/user/:name", function (req, res) {
    const name = req.params.name;

    db.Profile.findOne({
      where: {
        name: name,
      },
    }).then(function (dbProfile) {
      res.send(dbProfile);
    });
  });

  // Route for retrieving profile information
  app.get("/api/profile", function (req, res) {
    const email = req.user.username;
    console.log(email);
    db.Profile.findOne({
      where: {
        email: email,
      },
    }).then(function (dbProfile) {
      res.send(dbProfile);
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

  // Route for updating user's picture information
  app.put("/api/picture", function (req, res) {
    const email = req.body.email;
    const url = req.body.url;
    const update = { picture: url };
    db.Profile.update(update, {
      where: {
        email: email,
      },
    }).then(function (dbProfile) {
      res.json(dbProfile);
    });
  });

  // Route for logging out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};
