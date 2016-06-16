var wechat = require('co-wechat')
var api = require('co-wechat-api')
var path = require('path')
var config = require(path.join('../../', 'config'))
var request = require('koa-request')

function* getCompeid(){
  var useroption =" http://aosaikang.xiaonian.me/api/competition/getCurrentCompetition"
  var info = yield request(useroption)
  var comp = JSON.parse(info.body)
  if(typeof comp.errorMsg =="string" || typeof info.devErrorMsg =="string" ){
    return false
  }else{
    comp = comp.data.competition
    return comp
  }
}


function* getUserInfo(openid){
  var useroption = "http://aosaikang.xiaonian.me/api/student/getStudentByOpenid?openid="+openid
  var tempuserInfo = yield request(useroption)
  var info = JSON.parse(tempuserInfo.body)
  if(typeof info.errorMsg =="string" || typeof info.devErrorMsg =="string" ){
    return false
  }else{
    info = info.data.student
    return info
  }
}

function* getCompeInfo(competitionid,openid,sid){
  var useroption = "http://aosaikang.xiaonian.me/api/competition/getEnrollment?competition="+competitionid+"&openid="+openid+"&student="+sid
  var tempuserInfo = yield request(useroption)
  var info = JSON.parse(tempuserInfo.body)
  if(typeof info.errorMsg =="string" || typeof info.devErrorMsg =="string" ){
    return false
  }else{
    info = info.data.enrollment
    return info
  }  
}

function* signUp(competitionid,openid){

  
  var useroption = {
      url:"http://aosaikang.xiaonian.me/api/competition/enroll",
      method:'post',
      qs: {
            competition: competitionid
            ,
            openid: openid
          }
    }
  var tempuserInfo = yield request(useroption)
  if(typeof tempuserInfo.body.errorMsg == "string" || typeof tempuserInfo.body.devErrorMsg == "string" ){
      return false
  }else{
      return  JSON.parse(tempuserInfo.body).data.enrollment
  }

}

function *showHonor(sid){
  var honouroption = "http://aosaikang.xiaonian.me/api/reward/getStudnetRewards?student="+sid
  var temphonour = yield request(honouroption)
  var rewards = JSON.parse(temphonour.body)
  if(typeof rewards.errorMsg == 'string' || typeof rewards.devErrorMsg == "string"){
    return 'false'
  }
  else{
    rewards = rewards.data.rewards
  }
  return rewards
}

module.exports = wechat(config.wechat).middleware(function *() {
  // 微信输入信息都在this.weixin上
  console.log(this)
  var message = this.weixin;
  var competition = yield getCompeid()
  var openid = message.FromUserName
  var userInfo = yield getUserInfo(openid)
  var compeInfo = yield getCompeInfo(competition.id,openid,userInfo.id)
  if(message.Event === 'CLICK'){
    switch(message.EventKey){
      case 'V101':
        if(!userInfo){
          this.body = {
            content: '您还没有绑定账号，请先\n\n'+
            '<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab5e05ece55fcade&redirect_uri=http%3A%2F%2Faosaikangjs.xiaonian.me%2Fregister&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect">注册账号</a>\n\n'+
            '然后继续报名操作'
            ,
            type:'text'
          }
          return false;
        }

        if(userInfo.grade!="9"){
          this.body = {
            content: '本次赛事仅针对初三升高一同学开放哦~更多赛事提醒请关注本账号日后推送'
            ,
            type:'text'
          }
          return false;
        }

        if(!!compeInfo.student){
            this.body = {
            content: '您已经报过名啦！\n\n'+"姓名："+userInfo.name+'\n\n'
            +"赛事："+competition.name+'\n\n'
            +"报名时间："+compeInfo['create_time'],
            type:'text'
          }
          return false
        }
        var signUpResult = yield signUp(competition.id,openid)
        if(!signUpResult){
          this.body = {
            content: '报名失败！请稍后再试',
            type:'text'
          }
          return false
        }
        this.body = {
            content: '报名成功！\n\n'
            +"姓名："+userInfo.name+'\n\n'
            +"赛事："+competition.name+'\n\n'
            +"报名时间："+signUpResult['create_time'],
            type:'text'
        }
        break;
      case 'V102':
        if(!userInfo){
          this.body = {
            content: '您还没有绑定账号，请先\n\n'+
            '<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab5e05ece55fcade&redirect_uri=http%3A%2F%2Faosaikangjs.xiaonian.me%2Fregister&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect">注册账号</a>\n\n'+
            '然后继续报名操作'
            ,
            type:'text'
          }
          return false;
        }
        if(!compeInfo){
          this.body = {
            content: '您还没有报名，请先报名！',
            type:'text'
          }
          return false
        }
        
        if(!compeInfo['exam_info']){
          this.body = {
            content: '考场信息尚未分配，请稍后再查',
            type:'text'
          }
          return false
        }
        this.body = {
            content: '您的考场为\n\n'+
            compeInfo['exam_info']+'\n\n'
            +"祝您取得好成绩！",
            type:'text'
          }
        break;
      case 'V103':
        if(!userInfo){
          this.body = {
            content: '您还没有绑定账号，请先\n\n'+
            '<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab5e05ece55fcade&redirect_uri=http%3A%2F%2Faosaikangjs.xiaonian.me%2Fregister&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect">注册账号</a>\n\n'+
            '然后继续报名操作'
            ,
            type:'text'
          }
          return false;
        }
        if(!compeInfo){
          this.body = {
            content: '您还没有报名，请先报名！',
            type:'text'
          }
          return false
        }
        if(!compeInfo['score']){
          this.body = {
            content: '暂无成绩信息，请稍后再查',
            type:'text'
          }
          return false
        }
        this.body = {
            content: '您的成绩为\n\n'+
            compeInfo['score']+'\n\n'
            +"恭喜！",
            type:'text'
        }
        break;
      case 'V201':
        this.body = {
          content: '考试须知【TODO】',
          type:'text'
        }
        break;
      case 'V202':
        this.body = {
          content: '培训信息【TODO】',
          type:'text'
        }
        break;
      case 'V301':
        if(!userInfo&&!userInfo.id){
          this.body = {
            content: '您还没有绑定账号，请先\n\n'+
            '<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab5e05ece55fcade&redirect_uri=http%3A%2F%2Faosaikangjs.xiaonian.me%2Fregister&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect">注册账号</a>\n\n'+
            '以便体验更多功能'
            ,
            type:'text'
          }
          return
        }
        var prizeList = yield showHonor(userInfo.id)
        if(typeof prizeList === 'string'){
          this.body = {
            content: '系统故障，程序员哥哥正在奋力修复！cons'
            ,
            type:'text'
          }
          return false
        }
        else if(prizeList.length === 0){
          this.body = {
            content: '暂无获奖信息',
            type:'text'
          }
          return false
        }else{
          var content = "个人荣誉殿堂\n\n"
          var zkTmpl = ""
          for(var prize of prizeList){
            if(!!prize.zk_score){
              zkTmpl = "中考分数："+prize.zk_score+'\n\n\n'
            }else{
              var time = prize.time
              var  tmpl = "类别：" + config.prizes.category[prize.type] + "\n" +"赛事："+ prize.content +"\n" + "时间：" +  time.split('-').slice(0,2).join('-') + "\n" + "级别：" + config.prizes.areas[prize.area]+ "级\n" + "奖项：" + config.prizes.rank[prize.reward_type]+ "\n\n\n"
              content += tmpl
            }
          }
          content += zkTmpl
          content += "你就是传说中的大牛吗？"
          this.body = {
            content: content,
            type:'text'
          }
        }
        break;          
    }
  }
  else if (message.Event === 'subscribe'){
    this.body = {
      content:'感谢关注/:rose/:rose,您可以\n\n'+
      '<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab5e05ece55fcade&redirect_uri=http%3A%2F%2Faosaikangjs.xiaonian.me%2Fregister&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect">注册账号</a>\n\n'+
      '来获取更多奥赛咨询！',
      type:'text'
    }
  }
})