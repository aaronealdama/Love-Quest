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
    has_profile: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return User;
};
