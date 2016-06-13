var request = require('koa-request')
var config = require('../../config')
var render = require('co-views')('./app/views',{
  map: { html: 'swig' }
});

var register = {}

function* getUserInfo(openid){
  var useroption = "http://aosaikang.xiaonian.me/api/student/getStudentByOpenid?openid="+openid
  var tempuserInfo = yield request(useroption)
  var info = JSON.parse(tempuserInfo.body)
  if(typeof info.errorMsg =="string" || typeof info.devErrorMsg =="string" ){
    return false
  }else{
    info = info.data.student
    return info
  }
}

register.getInfo = function* (next){


  var option = {
    url:"https://api.weixin.qq.com/sns/oauth2/access_token?appid="+config.app.appid+"&secret="+config.app.appsecret+"&code="+this.query.code+"&grant_type=authorization_code"
  }
  var info = yield request(option)
  var param = JSON.parse(info.body)

  this.session.openid = param.openid

  var check = yield getUserInfo(param.openid)
  if(check){
    this.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab5e05ece55fcade&redirect_uri=http%3A%2F%2Faosaikangjs.xiaonian.me%2Fupdate&response_type=code&scope=snsapi_base&state=123#wechat_redirect');    
  }

  var user = {
    schools:config.school.names,
    classroom:config.school.classroom,
    grades:config.school.grades,
    areas:config.areas,
    openid:param.openid||123
  };
  this.body= yield render('register', user);
}

module.exports = register