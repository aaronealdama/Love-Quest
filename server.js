<<<<<<< HEAD
// Express

const express = require("express");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models");
=======
var express = require('express');
// var session = require('express-session');
const db = require("./models");

var PORT = process.env.PORT || 8080;
var app = express();

// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));
>>>>>>> b3bfc8ad1980923eb33e928a7a5f8b59ea75da4d

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

<<<<<<< HEAD
// Passport

const passport = require("./config/passport");

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Express Handlebars

const exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use(express.static("public"));

// Routes

require("./routes/html-routes.js")(app);
require("./routes/users-api-routes.js")(app);

// Syncing sequelize models

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
  });
});
=======
// Static directory
app.use(express.static("/public"));

// Routes
// =============================================================
// require("./routes/html-routes.js")(app);
require("./routes/users-api-routes.js")(app);

// app.listen(PORT, function() {
//     // Log (server-side) when our server has started
//     console.log("Server listening on: http://localhost:" + PORT);
// });

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log(`App listening on PORT: http://localhost:${PORT}`);
    });
});
>>>>>>> b3bfc8ad1980923eb33e928a7a5f8b59ea75da4d
