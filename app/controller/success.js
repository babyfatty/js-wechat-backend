var render = require('co-views')('./app/views',{
  map: { html: 'swig' }
});

module.exports = function* (){
	var success = {}

	this.body= yield render('success', success);
}