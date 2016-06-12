var sequelize = require('./dao')
var Sequelize = require('sequelize')


var UserHornour = sequelize.define('userhornour', {
  openid: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  hornourName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  hornourCat: {
    type: Sequelize.STRING,
    allowNull: false
  },
  hornourArea: {
    type: Sequelize.STRING,
    allowNull: false
  },
  hornourDate: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});
UserHornour.sync()
module.exports = User;
