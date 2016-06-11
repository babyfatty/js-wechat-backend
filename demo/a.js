// // 新增菜单

// app.use(function*(next){
//   var menu = config.menu
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

  {
   "button":[
       {
         "name":"考试报名",
         "sub_button":[
           {
             "type":"click",
             "name":"竞赛报名",
             "url":"V101"
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
             "name":"考试须知",
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