var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "ORM" model that matches up with DB
var orm = sequelize.define("accounts", {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

// Syncs with DB
orm.sync();

// Makes the ORM Model available for other files (will also create a table)
module.exports = orm;