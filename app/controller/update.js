var request = require('koa-request')
var config = require('../../config')
var render = require('co-views')('./app/views',{
  map: { html: 'swig' }
});
module.exports = function* (){
	console.log(this)
  console.log('code',this.query.code)
  console.log('state',this.query.state)
  var option = {
    url:"https://api.weixin.qq.com/sns/oauth2/access_token?appid="+config.app.appid+"&secret="+config.app.appsecret+"&code="+this.query.code+"&grant_type=authorization_code"
  }
  var info = yield request(option)
  console.log(info.body)
  // this.body=info.body
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