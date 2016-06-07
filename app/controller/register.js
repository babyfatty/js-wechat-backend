var request = require('koa-request')
var config = require('../../config')
var render = require('co-views')('./app/views', { ext: 'ejs' });

var getInfo = function* (next){
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
	  name: {
	    first: 'Tobi',
	    last: 'Holowaychuk'
	  },
	  species: 'ferret',
	  age: 3
  };
  this.body= yield render('user', { user: user });
}

module.exports = getInfo