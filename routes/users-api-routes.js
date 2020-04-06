const db = require("../models");
<<<<<<< HEAD
const passport = require("../config/passport");

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
      console.log(dbAuth);
      if (dbAuth.length) {
        return res.send(false);
      } else {
        db.User.create(req.body).then(function(dbUser) {
          return res.send(true);
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
  app.post("/api/auth", passport.authenticate("local"), function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    db.User.findOne({
      where: {
        username: username,
        password: password
      }
    }).then(function(dbUser) {
      if (dbUser === null) {
        res.send(false);
      } else {
        res.send(true);
      }

      // else if (dbUser[0].has_profile === false) {
      //   // If has_profile variable is false user is
      //   // taken to the profile signup page
      //   res.render("profile");
      // } else {
      //   // Else user's profile information is searched
      //   // within the profile database
      //   const username = dbUser[0].username;
      //   db.Profile.findOne({
      //     where: {
      //       email: username
      //     }
      //   }).then(function(dbProfile) {
      //     // Profile page is rendered through the
      //     // database information in Profile
      //     console.log(dbProfile);
      //     res.render("user-profile", dbProfile[0]);
      //   });
      // }
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

  // Route for logging out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};
=======

// var connection = require("../config/connection");
var path = require('path');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/login.html'));
    });

    // Route for creating new users into the database - Sign up route
    app.post("/api/users", function(req, res) {
        const username = req.body.username;
        db.User.findAll({
            where: {
                username: username
            }
        }).then(function(dbAuth) {
            if (dbAuth.length > 0) {
                window.location.href = "/login-exists";
            } else {
                db.User.create(req.body).then(function(dbUser) {
                    res.json(dbUser);
                });
            }
        });
    });

    // Route for logging existing users into the database - Login route
    app.post('/api/auth', function(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            db.User.findAll({ //Verify: using findOne not loggin in on the right password
                where: {
                    username: username,
                    password: password
                }
            }).then(function(dbUser) {
                if (!dbUser.length) {
                    res.send('Incorrect Username and/or Password!');
                    // window.location.href("/login-wrong");   //need to implement
                    // res.end();
                } else {
                    res.redirect('/home');
                    // res.render("index", dbUser);  //need to implemet handlebars
                }
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    });

    // Route for deleting users - Delete Account 
    app.delete("/api/users/:id", function(req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    //redirect test - need to be modified
    app.get('/home', function(req, res) {
        // console.log(req)
        res.send('Welcome back !'); //express-session removed
        res.end();
    });
}
>>>>>>> b3bfc8ad1980923eb33e928a7a5f8b59ea75da4d
