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
  var param = JSON.parse(info.body)
  this.session.openid = param.openid
  // 配置项数据
  var user = {
    schools:config.school.names,
    classroom:config.school.classroom,
    grades:config.school.grades,
    areas:config.areas,
    prizeAreas:config.prizes.areas,
    prizeCats:config.prizes.category,
    openid:param.openid||'123'
  };
  // 基本信息
  var useroption = "http://aosaikang.xiaonian.me/api/student/getStudentByOpenid?openid="+user.openid
  var tempuserInfo = yield request(useroption)
  var info = JSON.parse(tempuserInfo.body).data.student
  info.klass = info.class
  // 获奖
  var honouroption = "http://aosaikang.xiaonian.me/api/reward/getStudnetRewards?student="+info.id
  var temphonour = yield request(honouroption)
  var rewards = JSON.parse(temphonour.body)
  if(typeof rewards.errorMsg == 'string'){
    rewards = []
  }else{
    rewards = rewards.data.rewards
  }
  var obj = Object.assign(info,user)
  for (var reword of rewards) {
    if(!!reward){
      reword.show = false      
    }
  }
  obj.prizeList = JSON.stringify(rewards)
  this.body= yield render('udetail', obj);
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
      parentname: formParam.parent_name,
      parenttel: formParam.parent_phone
  })
}

module.exports = update