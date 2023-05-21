const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql')

const mysql_uri = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:3306/${process.env.MYSQL_DB}`
const sequelize = new Sequelize(mysql_uri,);

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  username: {
    type: DataTypes.STRING,
    required: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    default: Date.now,
  },
  created_at: {
    type: DataTypes.DATE,
    default: Date.now,
  },
});

module.exports = User;