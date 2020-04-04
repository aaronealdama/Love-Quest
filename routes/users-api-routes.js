const db = require("../models");

module.exports = function(app) {
  // API routes for accessing users

  // Route for creating new users into the database
  app.post("/api/users", function(req, res) {
    const username = req.body.username;
    db.User.findAll({
      where: {
        username: username
      }
    }).then(function(dbAuth) {
      if (dbAuth.length > 0) {
        res.redirect("/signup-exists");
      } else {
        db.User.create(req.body).then(function(dbUser) {
          res.json(dbUser);
        });
      }
    });
  });

  // Route for deleting users
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Route for authenticating login
  app.post("/api/auth", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    db.User.findOne({
      where: {
        username: username,
        password: password
      }
    }).then(function(dbUser) {
      console.log(dbUser);
      if (!dbUser.length) {
        res.redirect("/login-wrong");
      } else if (dbUser[0].has_profile === false) {
        // If has_profile variable is false user is
        // taken to the profile signup page
        res.render("signup");
      } else {
        // Else user's profile information is searched
        // within the profile database
        const username = dbUser[0].username;
        db.Profile.findOne({
          where: {
            email: username
          }
        }).then(function(dbProfile) {
          // Profile page is rendered through the
          // database information in Profile
          console.log(dbProfile);
          res.render("profile", dbProfile[0]);
        });
      }
    });
  });
  // Route for creating a user's profile
  app.post("/api/profiles", function(req, res) {
    db.Profile.create(req.body).then(function(dbProfile) {
      console.log(dbProfile);
      res.render("profile", dbProfile[0]);
    });
  });
  // Route for updating user's has_profile value
  app.put("/api/update", function(req, res) {
    const username = req.body.email;
    const update = { has_profile: true };
    db.User.update(update, {
      where: { username: username }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
