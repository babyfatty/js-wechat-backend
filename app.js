var koa = require('koa');
var router = require('koa-router')();
var app = koa();
var wechat = require('co-wechat');
var config = require('./config.js');
var fs = require('fs')
var API = require('wechat-api');
var api = new API(config.wechat.appid, config.wechat.appsecret, function* () {
  // 传入一个获取全局token的方法
  var txt = yield fs.readFile('access_token.txt', 'utf8');
  return JSON.parse(txt);
}, function* (token) {
  // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
  // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
  yield fs.writeFile('access_token.txt', JSON.stringify(token));
});

// 查询是否有菜单
app.use(function*(){
  var result = yield* api.getMenu();
  console.log(result)
})


// 创建菜单
app.use(function*(){
  var menu = {
   "button":[
       {
         "name":"考试报名",
         "sub_button":[
           {
             "type":"view",
             "name":"竞赛报名",
             "url":"http://www.soso.com/"
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
             "type":"view",
             "name":"考试须知",
             "url":"http://www.soso.com/"
           },
           {
             "type":"view",
             "name":"培训信息",
             "key":"V1001_GOOD"
           }]
        },{
         "name":"个人信息",
         "sub_button":[
           {
             "type":"view",
             "name":"基本信息绑定",
             "url":"http://www.soso.com/"
           },
           {
             "type":"click",
             "name":"手机绑定",
             "key":"V1001_GOOD"
           },
           {
             "type":"click",
             "name":"个人信息完善",
             "key":"V1001_GOOD"
           },
           {
             "type":"click",
             "name":"个人荣誉殿堂",
             "key":"V1001_GOOD"
           }]
        }
    ]
  }
  var result = yield* agetpi.createMenu(menu);
  console.log(result)
})  

app.use( 
    wechat(config.wechat).middleware(function *() {
  // 微信输入信息都在this.weixin上
  var message = this.weixin;
  console.log(message)
  if (message.Content === 'diaosi') {
    // 回复屌丝(普通回复)
    this.body = 'hehe'+api.getIp();
  } else if (message.Content === 'text') {
    //你也可以这样回复text类型的信息
    this.body = {
      content: 'text object',
      type: 'text'
    };
  } else if (message.Content === 'hehe') {
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
  } else if (message.Content === 'kf') {
    // 转发到客服接口
    this.body = {
      type: "customerService",
      kfAccount: "test1@test"
    };
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
);

router.post('/wechat', 
    wechat(config.wechat).middleware(function *() {
  // 微信输入信息都在this.weixin上
  var message = this.weixin;
  if (message.Content === 'diaosi') {
    // 回复屌丝(普通回复)
    this.body = 'hehe'+api.getIp();
  } else if (message.Content === 'text') {
    //你也可以这样回复text类型的信息
    this.body = {
      content: 'text object',
      type: 'text'
    };
  } else if (message.Content === 'hehe') {
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
  } else if (message.Content === 'kf') {
    // 转发到客服接口
    this.body = {
      type: "customerService",
      kfAccount: "test1@test"
    };
  } else {
    // 回复高富帅(图文回复)
    this.body = [
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: '//gw.alicdn.com/tps/TB1tFrCLFXXXXaBaXXXXXXXXXXX-517-502.png',
        url: '//taobao.com/'
      }
    ];
  }
})
);


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.host.port);

console.log('server is running on port '+ config.host.port)
