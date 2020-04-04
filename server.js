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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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