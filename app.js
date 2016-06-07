var koa = require('koa');
var router = require('koa-router')();
var app = koa();
var wechat = require('co-wechat');
var config = require('./config.js');
var fs = require('co-fs')
var API = require('co-wechat-api');
var request = require('koa-request');

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
  yield next
})

function checkVaild(actoken,openid){
  var option = {
    url :"https://api.weixin.qq.com/sns/auth?access_token="+actoken+"&openid="+openid 
  }
  var resVaild = yield request(option)
  return resVaild.body.errcode === 0?true:false
}

function updataActoken(rftoken){
  var option = {
    url :"https://api.weixin.qq.com/sns/oauth2/refresh_token?appid="+ config.app.appid +"&grant_type=refresh_token&refresh_token="+rftoken
  }
  var newActoken = yield request(option)
  return newActoken.body.access_token
}

router.get('/update',function* (){
  console.log('code',this.query.code)
  console.log('state',this.query.state)
  var option = {
    url:"https://api.weixin.qq.com/sns/oauth2/access_token?appid="+config.app.appid+"&secret="+config.app.appsecret+"&code="+this.query.code+"&grant_type=authorization_code"
  }
  var info = yield request(option)
  console.log(info.body)
  this.body=info.body
})

router.get('/register',function* (next){
  console.log(this)
  var option = {
    url:"https://api.weixin.qq.com/sns/oauth2/access_token?appid="+config.app.appid+"&secret="+config.app.appsecret+"&code="+this.query.code+"&grant_type=authorization_code"
  }
  var info = yield request(option)
  this.param = info.body
  yield next
},function* (next){
  var param = JSON.parse(this.param)
  var option = {
    url:"https://api.weixin.qq.com/sns/userinfo?access_token="+param.access_token+"&openid="+param.openid+"&lang=zh_CN"
  }
  var info = yield request(option)
  console.log(info.body)
  this.body=info.body
})

router.post('/wechat',wechat(config.wechat).middleware(function *() {
  // 微信输入信息都在this.weixin上
  var message = this.weixin;
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
