const { DataTypes } = require("sequelize");
const { sequelize } = require("../db"); // Make sure to import your Sequelize instance

const AuthModel = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  AuthModel,
};
