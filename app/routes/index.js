var router = require('koa-router')();

var controller = require('../controller')

router.get('/update',controller.update)

router.get('/register',controller.register.getInfo)

router.get('/admin',controller.admin)

router.post('/wechat',controller.wechat)

router.post('/userRegister',controller.register.saveInfo)

module.exports = router