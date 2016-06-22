var register = require('./register')
var update = require('./update')
var wechat = require('./wechat')

exports.admin=require('./admin')
exports.admin2=require('./admin2')
exports.register=register
exports.update= update
exports.wechat=wechat
exports.fileupload = require('./fileupload')
exports.success = require('./success')
exports.fail = require('./fail')
exports.revise = require('./revise')
