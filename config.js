module.exports = {
    wechat: {
        token: 'mytoken',
        appid: 'wx0b4f6ee3da84307c',
        appsecret: '2e6e21ead4da99a6f565b9fc07f138f5'
    },
    host: {
        port: 3080,
        env: 'development'
    },
    app: {
    	appid:"wx0b4f6ee3da84307c",
    	appsecret:"2e6e21ead4da99a6f565b9fc07f138f5"
    },
    school: {
        grades:[{value:7,text:'初一升初二'},{value:8,text:'初二升初三'},{value:9,text:'初三升高一'},{value:10,text:'高一升高二'},{value:11,text:'高二升高三'},{value:12,text:'高三毕业季'}],
        names:[{value:0,text:'树人'},{value:1,text:'南外'},{value:2,text:'金陵汇文'},{value:3,text:'二十九中'},{value:4,text:'其他'}],
        classroom:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    },
    areas: ['南京市','苏州市','无锡市','扬州市','常州市','南通市','盐城市','连云港市','徐州市','淮安市','宿迁市','泰州市','镇江市'],
    prizes: {
        areas:['全国','省','市'],
        category:['数学','语文','英语','信息（含机器人）','音乐（含乐器和声乐）','棋类','体育运动']
    },
    menu :{
   "button":[
       {
         "name":"考试报名",
         "sub_button":[
           {
             "type":"click",
             "name":"竞赛报名",
             "key":"V101"
           },
           {
             "type":"click",
             "name":"考场查询",
             "key":"V102"
           },{
             "type":"click",
             "name":"成绩查询",
             "key":"V103"
           }]
        },
       {
         "name":"相关政策",
         "sub_button":[
           {
             "type":"click",
             "name":"考场查询",
             "key":"V201"
           },
           {
             "type":"click",
             "name":"培训信息",
             "key":"V202"
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
             "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b4f6ee3da84307c&redirect_uri=http%3A%2F%2F139.129.27.196%2Fupdate&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
           },
           {
             "type":"click",
             "name":"个人荣誉殿堂",
             "key":"V301"
           }]
        }
    ]
  }
};
