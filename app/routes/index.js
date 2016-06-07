var router = require('koa-router')();

var controller = require('../controller')

router.get('/update',controller.update)

router.get('/register',controller.register)

router.post('/wechat',controller.wechat)

module.exports = router