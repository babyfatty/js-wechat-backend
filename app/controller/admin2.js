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

var self = this
module.exports = {
  checkcode :function* (){

      var checkoption ='http://aosaikang.xiaonian.me/api/student/checkBindCaptcha?phone=13045703214&code='+this.query.code+'&delete=true'
      var result = yield request(checkoption)
      console.log(result.body)

      result.body = {"code":0,"data":{}}
      if(result.body.data){
        console.log('chengle')
        this.redirect('/selwoodnanjinguniversity520')
        this.body = result.body
        return false
      }else{
        this.body = result.body
        return false
      }
  },
  show : function* (){
    var telNumbers = yield getUserTel()

    var admin2 = {}

    this.body= yield render('admin2', admin2);
  }
}
