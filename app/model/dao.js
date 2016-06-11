var Sequelize = require('sequelize')
var mysql = require('mysql')

var sequelize = new Sequelize('asxc', 'username', 'password', {
  host: '139.129.27.196',
  port:3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define : {
	timestamps: true,
	createdAt: 'gmt_create',
	updatedAt: 'gmt_modified',
	charset: 'utf8',
	collate: 'utf8_general_ci',
  }
});

module.exports = sequelize

