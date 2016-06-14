var fs = require('fs')
var render = require('co-views')('./app/views',{
  map: { html: 'swig' }
});

module.exports = function* (){
	var admin = {}

	this.body= yield render('admin', admin);
}