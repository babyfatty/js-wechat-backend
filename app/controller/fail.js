var render = require('co-views')('./app/views',{
  map: { html: 'swig' }
});

module.exports = function* (){
	var fail = {}
	fail.message = this.query.state
	this.body= yield render('fail', fail);
}