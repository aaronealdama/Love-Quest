module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING
        },
        date_of_birth: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        zipcode: {
            type: DataTypes.INTEGER
        },
        profession: {
            type: DataTypes.STRING
        },
        has_profile: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false,
    });
    return User;
};