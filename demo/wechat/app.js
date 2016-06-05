var wechat          = require("wechat");
var express         = require("express");
var logger          = require("morgan");
var errorhandler    = require("errorhandler");
var bodyParser      = require("body-parser");
var fs              = require("fs");
var path            = require("path");
var routes          = require("./../wechat-demo/routes");
var config          = require("./../wechat-demo/config");

var app = express();

//config
app.set('port', config.host.port);
app.use(logger('combined', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// route

    app.use('/weixin', routes.weixin);


// error handler
app.use(errorhandler());

// start up server
app.listen(app.get('port'), function () {
    console.log('Server listening on:', app.get('port'));
});


