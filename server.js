// Express

const express = require("express");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
