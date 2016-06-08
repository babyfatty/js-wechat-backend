var koa = require('koa');
var router = require('./app/routes');
var app = koa();
var wechat = require('co-wechat');
var config = require('./config.js');
var fs = require('co-fs')
var API = require('co-wechat-api');
var request = require('koa-request');
var onerror = require('koa-onerror');
var logger = require('mini-logger');
var path = require('path');


var api = new API(config.wechat.appid, config.wechat.appsecret, function* () {
  // 传入一个获取全局token的方法
  var txt = yield fs.readFile('access_token.txt', 'utf8');
  return JSON.parse(txt);
}, function* (token) {
  // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
  // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
  yield fs.writeFile('access_token.txt', JSON.stringify(token));
});

app.use(function*(next){
  var menu = 
  {
 "button":[
   {
     "type":"click",
     "name":"今日歌曲",
     "key":"V1001_TODAY_MUSIC"
   },
   {
     "name":"菜单",
     "sub_button":[
       {
         "type":"view",
         "name":"搜索",
         "url":"http://www.soso.com/"
       },
       {
         "type":"click",
         "name":"赞一下我们",
         "key":"V1001_GOOD"
       }]
     }]
   }
}




  console.log('222')
  console.log('menu',menu)
  var result = yield* api.createMenu(menu); 
  console.log(result)
  yield next

})

app.use(require('koa-static')(path.join(__dirname, 'public')))

function checkVaild(actoken,openid){
  var option = {
    url :"https://api.weixin.qq.com/sns/auth?access_token="+actoken+"&openid="+openid 
  }
//  var resVaild = yield request(option)
  //return resVaild.body.errcode === 0?true:false
}

function updataActoken(rftoken){
  var option = {
    url :"https://api.weixin.qq.com/sns/oauth2/refresh_token?appid="+ config.app.appid +"&grant_type=refresh_token&refresh_token="+rftoken
  }
  //var newActoken = yield request(option)
  //return newActoken.body.access_token
}

app
  .use(router.routes())
  .use(router.allowedMethods());

onerror(app);
  

app.listen(config.host.port);

console.log('server is running on port '+ config.host.port)
