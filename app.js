var koa = require('koa');
var router = require('koa-router')();
var app = koa();
var wechat = require('co-wechat');
var config = require('./config.js');
var fs = require('co-fs')
var API = require('co-wechat-api');
var api = new API(config.wechat.appid, config.wechat.appsecret, function* () {
  // 传入一个获取全局token的方法
  var txt = yield fs.readFile('access_token.txt', 'utf8');
  return JSON.parse(txt);
}, function* (token) {
  // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
  // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
  yield fs.writeFile('access_token.txt', JSON.stringify(token));
});
wechat(config.wechat)
// // 新增菜单

// app.use(function*(next){

//   var menu = {
//    "button":[
//        {
//          "name":"考试报名",
//          "sub_button":[
//            {
//              "type":"view",
//              "name":"竞赛报名",
//              "url":"http://baidu.com"
//            },
//            {
//              "type":"click",
//              "name":"考场查询",
//              "key":"V1001_GOOD"
//            },{
//              "type":"click",
//              "name":"成绩查询",
//              "key":"V1001_GOOD"
//            }]
//         },
//        {
//          "name":"相关政策",
//          "sub_button":[
//            {
//              "type":"click",
//              "name":"考场查询",
//              "key":"V1001_GOOD"
//            },
//            {
//              "type":"click",
//              "name":"培训信息",
//              "key":"V1001_GOOD"
//            }]
//         },{
//          "name":"个人信息",
//          "sub_button":[
//            {
//              "type":"click",
//              "name":"考场查询",
//              "key":"V1001_GOOD"
//            },
//            {
//              "type":"click",
//              "name":"手机绑定",
//              "key":"V1001_GOOD"
//            },
//            {
//              "type":"click",
//              "name":"个人信息完善",
//              "key":"V1001_GOOD"
//            },
//            {
//              "type":"click",
//              "name":"个人荣誉殿堂",
//              "key":"V1001_GOOD"
//            }]
//         }
//     ]
//   }
//   yield next
//   var result = yield* api.createMenu(menu);
//   console.log(result)
//   console.log('222')
// })

// // 查询菜单
// app.use(function*(next){
//   var result = yield* api.getMenu();
//   console.log(result)
//   yield next;
// })
router.get('/register',function* (){
  this.body="hello"
})


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.host.port);

console.log('server is running on port '+ config.host.port)
