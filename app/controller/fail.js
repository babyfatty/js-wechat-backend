var render = require('co-views')('./app/views',{
  map: { html: 'swig' }
});

module.exports = function* (){
	var fail = {}

	this.body= yield render('fail', fail);
}