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
//              "type":"click",
//              "name":"考场查询",
//              "key":"V1001_GOOD"
//            },
//            {
//              "type":"click",
//              "name":"手机绑定",
//              "key":"V1001_GOOD"
//            },
//            {
//              "type":"click",
//              "name":"个人信息完善",
//              "key":"V1001_GOOD"
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