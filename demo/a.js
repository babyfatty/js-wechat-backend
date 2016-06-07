// // 新增菜单

// app.use(function*(next){

//   var menu = {
//    "button":[
//        {
//          "name":"考试报名",
//          "sub_button":[
//            {
//              "type":"view",
//              "name":"竞赛报名",
//              "url":"http://baidu.com"
//            },
//            {
//              "type":"click",
//              "name":"考场查询",
//              "key":"V1001_GOOD"
//            },{
//              "type":"click",
//              "name":"成绩查询",
//              "key":"V1001_GOOD"
//            }]
//         },
//        {
//          "name":"相关政策",
//          "sub_button":[
//            {
//              "type":"click",
//              "name":"考场查询",
//              "key":"V1001_GOOD"
//            },
//            {
//              "type":"click",
//              "name":"培训信息",
//              "key":"V1001_GOOD"
//            }]
//         },{
//          "name":"个人信息",
//          "sub_button":[
//            {
//              "type":"view",
//              "name":"基本信息绑定",
//              "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b4f6ee3da84307c&redirect_uri=http%3A%2F%2F139.129.27.196%2Fregister&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
//            },
//            {
//              "type":"view",
//              "name":"个人信息完善",
//              "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b4f6ee3da84307c&redirect_uri=http%3A%2F%2F139.129.27.196%2Fupdate&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
//            },
//            {
//              "type":"click",
//              "name":"个人荣誉殿堂",
//              "key":"V1001_GOOD"
//            }]
//         }
//     ]
//   }
//   yield next
//   var result = yield* api.createMenu(menu);
//   console.log(result)
//   console.log('222')
// })

// // 查询菜单
// app.use(function*(next){
//   var result = yield* api.getMenu();
//   console.log(result)
//   yield next;
// })