var wechat = require('co-wechat')
var path = require('path')
var config = require(path.join('../../', 'config'))
module.exports = wechat(config.wechat).middleware(function *() {
  // 微信输入信息都在this.weixin上
  var message = this.weixin;
  console.log(message)
  if(message.Event === 'CLICK'){
    switch(message.EventKey){
      case 'V101':
        this.body = {
          content: '测试信息',
          type:'text'
        }
        break;
      case 'V102':
        this.body = {
          content: '测试信息',
          type:'text'
        }
        break;
      case 'V103':
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
    this.body = {
      content:'感谢关注/:rose,您可以\n\n'+

      '<a href="http://baidu.com">注册账号</a>\n'+
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