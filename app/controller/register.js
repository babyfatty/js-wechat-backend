var request = require('koa-request')
var config = require('../../config')
var render = require('co-views')('./app/views',{
  map: { html: 'swig' }
});

var getInfo = function* (next){
	console.log(this)
  var option = {
    url:"https://api.weixin.qq.com/sns/oauth2/access_token?appid="+config.app.appid+"&secret="+config.app.appsecret+"&code="+this.query.code+"&grant_type=authorization_code"
  }
  var info = yield request(option)
  console.log('info',info.body)
  var param = JSON.parse(info.body)
  var option = {
    url:"https://api.weixin.qq.com/sns/userinfo?access_token="+param.access_token+"&openid="+param.openid+"&lang=zh_CN"
  }
  var inf = yield request(option)
  console.log(inf.body)
  var user = {
    schools:config.school.names,
    classroom:config.school.classroom,
    grades:config.school.grades,
    areas:config.areas
  };
  this.body= yield render('register', user);
}

module.exports = getInfo