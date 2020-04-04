// Sends various html pages to users

// Packages:

const path = require("path");

// Routes

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/login-wrong", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login-wrong.html"));
  });

  app.get("/login-exists", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login-exists.html"));
  });
};
