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

// // 新增菜单

app.use(function*(next){

  var menu = {
   "button":[
       {
         "name":"考试报名",
         "sub_button":[
           {
             "type":"view",
             "name":"竞赛报名",
             "url":"http://baidu.com"
           },
           {
             "type":"click",
             "name":"考场查询",
             "key":"V1001_GOOD"
           },{
             "type":"click",
             "name":"成绩查询",
             "key":"V1001_GOOD"
           }]
        },
       {
         "name":"相关政策",
         "sub_button":[
           {
             "type":"click",
             "name":"考场查询",
             "key":"V1001_GOOD"
           },
           {
             "type":"click",
             "name":"培训信息",
             "key":"V1001_GOOD"
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
             "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b4f6ee3da84307c&redirect_uri=http%3A%2F%2F139.129.27.196%2Fupdate&response_type=code&scope=snsapi_userbase&state=123#wechat_redirect"
           },
           {
             "type":"click",
             "name":"个人荣誉殿堂",
             "key":"V1001_GOOD"
           }]
        }
    ]
  }
  yield next
  var result = yield* api.createMenu(menu);
  console.log(result)
  console.log('222')
})

// // 查询菜单
// app.use(function*(next){
//   var result = yield* api.getMenu();
//   console.log(result)
//   yield next;
// })
app.use(function*(next){
  console.log(this)
  yield next
})

router.get('/register',function* (){
  console.log(this)
  this.body="hello"
})

router.post('/wechat',wechat(config.wechat).middleware(function *() {
  // 微信输入信息都在this.weixin上
  var message = this.weixin;
  console.log(message)
  if(message.Event === 'CLICK'){
    switch(message.EventKey){
      case 'V1001_GOOD':
        this.body = {
          content: '测试信息',
          type:'text'
        }
        break;
    }
  }
  else if (message.Event === 'unsubscribe'){

  }
  else if (message.Event === 'subscribe'){
    this.body = [{
                    title: '欢迎加入!!',
                    description: ' 高富帅请输入: 1 \r\n 白富美请输入: 2 \r\n 屌丝请直接输入: diaosi',
                    picurl: 'http://lxcdn.dl.files.xiaomi.net/mfsv2/download/s008/p01Z4fiL6J5k/QDICPcIYfmwoUL.jpg?thumb=320x320',
                    url: 'http://weibo.com/fengjieluoyufeng?c=spr_qdhz_bd_baidusmt_weibo_s&nick=%E7%BD%97%E7%8E%89%E5%87%A4'
                }]
  }
  else if (message.Content === 'diaosi') {
    // 回复屌丝(普通回复)
    this.body = 'hehe'+api.getIp();
  } else if (message.Content === '1') {
    //你也可以这样回复text类型的信息
    this.body = {
      content: 'text object',
      type: 'text'
    };
  } else if (message.Content === '2') {
    // 回复一段音乐
    this.body = {
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3"
      }
    };
  } else if (message.Content === '3') {
    // 转发到客服接口
    this.body = [
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: '//img.blog.csdn.net/20151030004840663',
        url: '//baidu.com/'
      }
    ];
  } else {
    // 回复高富帅(图文回复)
    this.body = [
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: '//img.blog.csdn.net/20151030004840663',
        url: '//baidu.com/'
      }
    ];
  }
})
)
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.host.port);

console.log('server is running on port '+ config.host.port)
