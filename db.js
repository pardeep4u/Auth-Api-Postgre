const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.POSTGRELINK, {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // Required for development/testing
    },
  },
});

module.exports = {
  sequelize,
};
