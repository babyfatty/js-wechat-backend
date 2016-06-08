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