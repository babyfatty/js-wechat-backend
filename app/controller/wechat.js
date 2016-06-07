var wechat = require('co-wechat')
var path = require('path')
var config = require(path.join('../../', 'config'))
module.exports = wechat(config.wechat).middleware(function *() {
  console.log(this)
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