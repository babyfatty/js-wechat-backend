var wechat = require('co-wechat')
var api = require('co-wechat-api')
var path = require('path')
var config = require(path.join('../../', 'config'))

function *checkRegister(){
  return false
}

function *checkSignup(){
  return {
    isSignup:false,
    signUpInfo:signUpInfo
  }
}

function *signUp(ctx){
  if(checkRegister()){

    return
  }
  if(checkSignup().isSignup){

    return
  }
  return {
    success:true,
    errorCode:''
  }
}

function *checkSeat(ctx){
  if(checkRegister()){

    return
  }
  if(checkSignup().isSignup){

    return
  }
  return {
    seatInfo :'',
    success : false
  }
}

function *checkScore(){
  if(checkRegister()){

    return
  }
  if(checkSignup().isSignup){

    return
  }
  return {

  }
}

function *showHonor(ctx){
  return{

  }
}

module.exports = wechat(config.wechat).middleware(function *() {
  // 微信输入信息都在this.weixin上
  var message = this.weixin; 
  if(message.Event === 'CLICK'){
    switch(message.EventKey){
      case 'V101':
        var signUpInfo = yield signUp()
        this.body = {
          content: '测试信息',
          type:'text'
        }
        break;
      case 'V102':
        var seatInfo = yield checkSeat()
        this.body = {
          content: '测试信息',
          type:'text'
        }
        break;
      case 'V103':
        var scoreInfo = yield checkScore()
        this.body = {
          content: '测试信息',
          type:'text'
        }
        break;
      case 'V201':
        this.body = {
          content: '测试信息',
          type:'text'
        }
        break;
      case 'V202':
        this.body = {
          content: '测试信息',
          type:'text'
        }
        break;
      case 'V301':
        var honorInfo = yield showHonor()
        this.body = {
          content: '测试信息',
          type:'text'
        }
        break;          
    }
  }
  else if (message.Event === 'subscribe'){
    this.body = {
      content:'感谢关注/:rose/:rose,您可以\n\n'+
      '<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b4f6ee3da84307c&redirect_uri=http%3A%2F%2F139.129.27.196%2Fregister&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect">注册账号</a>\n\n'+
      '来获取更多奥赛咨询！',
      type:'text'
    }
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
  } 
})