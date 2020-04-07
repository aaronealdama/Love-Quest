module.exports = function (sequelize, DataTypes) {
  const Profile = sequelize.define("Profile", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interests: {
      type: DataTypes.STRING,
    },
    marital_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
    },
    has_kids: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    wants_kids: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    education: {
      type: DataTypes.STRING,
    },
    smoker: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    drinker: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ethnicity: {
      type: DataTypes.STRING,
    },
    religion: {
      type: DataTypes.STRING,
    },
    body_type: {
      type: DataTypes.STRING,
    },
    occupation: {
      type: DataTypes.STRING,
    },
    annual_income: {
      type: DataTypes.INTEGER,
    },
    about_me: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 200],
      },
    },
    picture: {
      type: DataTypes.BLOB,
      get: function () {
        return this.getDataValue("picture").toString("utf8");
      },
    },
  });
  return Profile;
};
