var fs = require('fs')
var render = require('co-views')('./app/views',{
  map: { html: 'swig' }
});
var request = require('koa-request')

function* getUserTel(){
  var useroption = "http://aosaikang.xiaonian.me/api/admin/exportStudents"
  var tempuserInfo = yield request(useroption)
  var info = JSON.parse(tempuserInfo.body)
  if(typeof info.errorMsg =="string" || typeof info.devErrorMsg =="string" ){
    return false
  }else{
    var sinfolist = info.data.students
  	var tels = []
  	for (var sinfo of sinfolist){
  		tels.push(sinfo['parent_phone'])
  	}
  	return tels 
  }
}


module.exports = function* (){

	var telNumbers = yield getUserTel()

	console.log(telNumbers)
	var admin = {
		"telNumbers":JSON.stringify(telNumbers)
	}

	this.body= yield render('admin', admin);
}