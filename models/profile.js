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
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    marital_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desire: {
      type: DataTypes.STRING,
    },

    height: {
      type: DataTypes.STRING,
    },
    education: {
      type: DataTypes.STRING,
    },
    occupation: {
      type: DataTypes.STRING,
    },
    annual_income: {
      type: DataTypes.INTEGER,
    },
    religion: {
      type: DataTypes.STRING,
    },
    ethnicity: {
      type: DataTypes.STRING,
    },
    body_type: {
      type: DataTypes.STRING,
    },
    interests: {
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
    drinker: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    smoker: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    about_me: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 200],
      },
    },
    picture: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    lovequester: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  });
  return Profile;
};
