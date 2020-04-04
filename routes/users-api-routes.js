const db = require("../models");

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