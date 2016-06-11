var sequelize = require('./dao')
var Sequelize = require('sequelize')
var thunkify = require('thunkify')


var User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING, // Will result in an attribute that is firstName when user facing but first_name in the database
    allowNull: false,
  },
  openid: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthdate: {
    type: Sequelize.STRING,
    allowNull: false
  },
  area: {
    type: Sequelize.STRING,
    allowNull: false
  },
  grade: {
    type: Sequelize.STRING,
    allowNull: false
  },
  highschool: {
    type: Sequelize.STRING
  },
  midschool: {
    type: Sequelize.STRING,
    allowNull: false
  },
  midschoolname: {
    type: Sequelize.STRING
  },
  classroom: {
    type: Sequelize.STRING,
    allowNull: false
  },
  parentname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  parenttel: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prizearea: {
    type: Sequelize.STRING
  },
  prizedate: {
    type: Sequelize.STRING
  },
  prizecat: {
    type: Sequelize.STRING
  },
  prizename: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});
User.sync()
module.exports = User;
