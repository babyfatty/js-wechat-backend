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


module.exports = {

  checkcode :function* (){
      var checkoption ='http://aosaikang.xiaonian.me/api/student/checkBindCaptcha?delete=true&phone=13951802031&code='+this.request.body.code
      var result = yield request(checkoption)
      var statuscode =  JSON.parse(result.body)
      if(statuscode.code === 0){
        this.redirect('/selwoodnanjinguniversity520')
      }else{
        this.body = "验证码错误"
      }
  },

  show : function* (){
    var telNumbers = yield getUserTel()

    var admin2 = {

    }
    this.body= yield render('admin2', admin2);
  }
}
