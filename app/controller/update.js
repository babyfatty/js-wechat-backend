var request = require('koa-request')
var config = require('../../config')
var render = require('co-views')('./app/views',{
  map: { html: 'swig' }
});

var update = {}

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

update.getInfo = function* (){

  
  var option = {
    url:"https://api.weixin.qq.com/sns/oauth2/access_token?appid="+config.app.appid+"&secret="+config.app.appsecret+"&code="+this.query.code+"&grant_type=authorization_code"
  }
  var info = yield request(option)
  var param = JSON.parse(info.body)
  this.session.openid = param.openid
  var check = yield getUserInfo(param.openid)

  // if(!check){
  //   this.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab5e05ece55fcade&redirect_uri=http%3A%2F%2Faosaikangjs.xiaonian.me%2Fregister&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect');    
  //   return
  // }
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
    if(!!reword){
      reword.show = false      
    }
  }
  obj.prizeList = JSON.stringify(rewards)
  this.body= yield render('udetail', obj);
}

module.exports = update