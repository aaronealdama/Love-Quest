var orm = require("../models/models");

// var connection = require("../config/connection");
var path = require('path');

module.exports = function(app) {
    app.get('/', function(request, response) {
        response.sendFile(path.join(__dirname + '/../public/login.html'));
    });

    app.post('/auth', function(request, response) {
        var username = request.body.username;
        var password = request.body.password;
        if (username && password) {
            orm.findAll({
                where: {
                    username: username,
                    password: password
                }
            }).then(function(results) {
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect('/home');
                } else {
                    response.send('Incorrect Username and/or Password!');
                }
                response.end();
            });
        } else {
            response.send('Please enter Username and Password!');
            response.end();
        }
    });

    app.get('/home', function(request, response) {
        if (request.session.loggedin) {
            response.send('Welcome back, ' + request.session.username + '!');
        } else {
            response.send('Please login to view this page!');
        }
        response.end();
    });
}