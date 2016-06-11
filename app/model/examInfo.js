var sequelize = require('./dao')
var Sequelize = require('sequelize')


var examinfo = sequelize.define('examinfo', {
  openid: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  isSign: {
    type: Sequelize.BOOLEAN,
    allowNull: false, 
    defaultValue: false
  },
  seat: {
    type: Sequelize.STRING
  },
  result: {
    type: Sequelize.DOUBLE
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});
examinfo.sync()

module.exports = examinfo;
