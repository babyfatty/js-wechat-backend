var register = require('./register')
var update = require('./update')
var wechat = require('./wechat')

exports.admin=require('./admin')
exports.register=register
exports.update= update
exports.wechat=wechat
exports.fileupload = require('./fileupload')
exports.success = require('./success')
exports.revise = require('./revise')
