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
// // 新增菜

router.get('/register',function* (){
  this.body="hello"
})
console.log(wechat(config.wechat).middleware())
function* (next) {
    var query = this.query;
    // 加密模式
    var encrypted = !!(query.encrypt_type && query.encrypt_type === 'aes' && query.msg_signature);
    var timestamp = query.timestamp;
    var nonce = query.nonce;
    var echostr = query.echostr;
    var method = this.method;

    if (method === 'GET') {
      var valid = false;
      if (encrypted) {
        var signature = query.msg_signature;
        valid = signature === that.cryptor.getSignature(timestamp, nonce, echostr);
      } else {
        // 校验
        valid = query.signature === getSignature(timestamp, nonce, that.token);
      }
      if (!valid) {
        this.status = 401;
        this.body = 'Invalid signature';
      } else {
        if (encrypted) {
          var decrypted = that.cryptor.decrypt(echostr);
          // TODO 检查appId的正确性
          this.body = decrypted.message;
        } else {
          this.body = echostr;
        }
      }
    } else if (method === 'POST') {
      if (!encrypted) {
        // 校验
        if (query.signature !== getSignature(timestamp, nonce, that.token)) {
          this.status = 401;
          this.body = 'Invalid signature';
          return;
        }
      }
      // 取原始数据
      var xml = yield getRawBody(this.req, {
        length: this.length,
        limit: '1mb',
        encoding: this.charset
      });

      this.weixin_xml = xml;
      // 解析xml
      var result = yield parseXML(xml);
      var formated = formatMessage(result.xml);
      if (encrypted) {
        var encryptMessage = formated.Encrypt;
        if (query.msg_signature !== that.cryptor.getSignature(timestamp, nonce, encryptMessage)) {
          this.status = 401;
          this.body = 'Invalid signature';
          return;
        }
        var decryptedXML = that.cryptor.decrypt(encryptMessage);
        var messageWrapXml = decryptedXML.message;
        if (messageWrapXml === '') {
          this.status = 401;
          this.body = 'Invalid signature';
          return;
        }
        var decodedXML = yield parseXML(messageWrapXml);
        formated = formatMessage(decodedXML.xml);
      }

      // 挂载处理后的微信消息
      this.weixin = formated;

      // 取session数据
      if (this.sessionStore) {
        this.wxSessionId = formated.FromUserName;
        this.wxsession = yield this.sessionStore.get(this.wxSessionId);
        if (!this.wxsession) {
          this.wxsession = {};
          this.wxsession.cookie = this.session.cookie;
        }
      }
      var handle = function *(next) {
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
}
      // 业务逻辑处理
      yield* handle.call(this);

      // 更新session
      if (this.sessionStore) {
        if (!this.wxsession) {
          if (this.wxSessionId) {
            yield this.sessionStore.destroy(this.wxSessionId);
          }
        } else {
          yield this.sessionStore.set(this.wxSessionId, this.wxsession);
        }
      }

      /*
       * 假如服务器无法保证在五秒内处理并回复，可以直接回复空串。
       * 微信服务器不会对此作任何处理，并且不会发起重试。
       */
      if (this.body === '') {
        return;
      }

      var replyMessageXml = reply(this.body, formated.ToUserName, formated.FromUserName);

      if (!query.encrypt_type || query.encrypt_type === 'raw') {
        this.body = replyMessageXml;
      } else {
        var wrap = {};
        wrap.encrypt = that.cryptor.encrypt(replyMessageXml);
        wrap.nonce = parseInt((Math.random() * 100000000000), 10);
        wrap.timestamp = new Date().getTime();
        wrap.signature = that.cryptor.getSignature(wrap.timestamp, wrap.nonce, wrap.encrypt);
        this.body = encryptWrap(wrap);
      }

      this.type = 'application/xml';

    } else {
      this.status = 501;
      this.body = 'Not Implemented';
    }
  }
router.use('/wechat',wechat(config.wechat).middleware(
)

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.host.port);

console.log('server is running on port '+ config.host.port)
