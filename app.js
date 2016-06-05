var koa = require('koa');
var router = require('koa-router')();
var app = koa();
var crypto = require('crypto');

// app.use(function *(){
//   this.body = 'Hello World';
// });

router.get('/',function*(){
	this.body= 'Hello World';
})

router.get('/wechat', function *() {
        // 获取微信的请求,注意是 get
        var signature = this.query.signature;
        var echostr = this.query.echostr;
        var timestamp = this.query.timestamp;
        var nonce = this.query.nonce;
        
        // 这里的token 要和你表单上面的token一致
        var token = 'mytoken';
        
        // 根文档上面的,我们需要对这三个参数进行字典序排序
        var arr = [token, timestamp, nonce];
        arr.sort();
        var tmpStr = arr.join('');
        
        // 排序完成之后,需要进行sha1加密, 这里我们使用node.js 自带的crypto模块
        var sha1 = crypto.createHash('sha1');
        sha1.update(tmpStr);
        var resStr = sha1.digest('hex');
        console.log(signature, 'resStr: ', resStr);
        
        // 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信,
        // 如果匹配,返回echoster , 不匹配则返回error
        if (resStr === signature) {
            this.body = echostr;
        } else {
        	this.body = 'false'
          // return false;
        }
    });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(80);

console.log('server is running on port:3000')