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

  var menu = {
   "button":[
       {
         "name":"考试报名",
         "sub_button":[
           {
             "type":"click",
             "name":"竞赛报名",
             "key":"V101"
           },
           {
             "type":"click",
             "name":"考场查询",
             "key":"V102"
           },{
             "type":"click",
             "name":"成绩查询",
             "key":"V103"
           }]
        },
       {
         "name":"相关政策",
         "sub_button":[
           {
             "type":"click",
             "name":"考场查询",
             "key":"V201"
           },
           {
             "type":"click",
             "name":"培训信息",
             "key":"V202"
           }]
        },{
         "name":"个人信息",
         "sub_button":[
           {
             "type":"view",
             "name":"基本信息绑定",
             "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b4f6ee3da84307c&redirect_uri=http%3A%2F%2F139.129.27.196%2Fregister&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
           },
           {
             "type":"view",
             "name":"个人信息完善",
             "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b4f6ee3da84307c&redirect_uri=http%3A%2F%2F139.129.27.196%2Fupdate&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
           },
           {
             "type":"click",
             "name":"个人荣誉殿堂",
             "key":"V301"
           }]
        }
    ]
  }
  yield next
  var result = yield* api.createMenu(menu);
  console.log(result)
  console.log('222')
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
