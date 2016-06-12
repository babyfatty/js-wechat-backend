var request = require('koa-request')
var config = require('../../config')
var render = require('co-views')('./app/views',{
  map: { html: 'swig' }
});
var User = require('../model/user')


var update = {}

update.getInfo = function* (){
  var option = {
    url:"https://api.weixin.qq.com/sns/oauth2/access_token?appid="+config.app.appid+"&secret="+config.app.appsecret+"&code="+this.query.code+"&grant_type=authorization_code"
  }
  var info = yield request(option)
  console.log(info.body)
  var param = JSON.parse(info.body)
  this.session.openid = param.openid

  var user = {
    schools:config.school.names,
    classroom:config.school.classroom,
    grades:config.school.grades,
    areas:config.areas,
    prizeAreas:config.prizes.areas,
    prizeCats:config.prizes.category
  };

  this.body= yield render('udetail', user);
}

update.updateInfo = function* (){
  var formParam = this.request.body
  var openid = this.session.openid
  var user = yield User.findOne({
    'where': {'openid': openid}
  })
  var result = yield user.update({
      username: formParam.username,
      openid: openid,
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
  })
}

module.exports = update