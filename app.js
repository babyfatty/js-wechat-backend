var koa = require('koa');
var app = koa();

app.use(function *(){
  this.body = 'Hello World';
});


app.listen(3000);

console.log('server is running on port:3000')