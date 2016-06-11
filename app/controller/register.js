var request = require('koa-request')
var config = require('../../config')
var render = require('co-views')('./app/views',{
  map: { html: 'swig' }
});
var user = require('../model/user')


var register = {}

register.getInfo = function* (next){
  var user = {
    schools:config.school.names,
    classroom:config.school.classroom,
    grades:config.school.grades,
    areas:config.areas
  };
  this.body= yield render('register', user);
}

register.saveInfo = function* (next){
  var option = {
    url:"https://api.weixin.qq.com/sns/oauth2/access_token?appid="+config.app.appid+"&secret="+config.app.appsecret+"&code="+this.query.code+"&grant_type=authorization_code"
  }
  var info = yield request(option)
  var param = JSON.parse(info.body)
  var option = {
    url:"https://api.weixin.qq.com/sns/userinfo?access_token="+param.access_token+"&openid="+param.openid+"&lang=zh_CN"
  }
  var inf = yield request(option)

  var formParam = this.request.body

  var saveResult = yield user.create({
      username: formParam.username,
      openid: param.openid||"1234321",
      gender: formParam.gender,
      birthdate: formParam.birthdate,
      area: formParam.area,
      grade: formParam.grade,
      highschool: formParam.highschool,
      midschool: formParam.midschool,
      midschoolname: formParam.midschoolname,
      classroom: formParam.classroom,
      parentname: formParam.parentname,
      parenttel: formParam.parenttel
    });

}

module.exports = register