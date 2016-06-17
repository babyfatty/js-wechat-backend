var router = require('koa-router')();

var controller = require('../controller')

router.get('/update',controller.update)

router.get('/register',controller.register.getInfo)

// router.get('/admin',controller.admin)

router.post('/wechat',controller.wechat)

router.get('/wechat',controller.wechat)

router.post('/fileupload',controller.fileupload.upload)

router.get('/downloadFile',controller.fileupload.download)

router.get('/selwoodnanjinguniversity520',controller.admin)

router.get('/admin',controller.admin2.show)

router.post('/checkcode',controller.admin2.checkcode)

router.get('/success',controller.success)

router.get('/fail',controller.fail)

router.get('/revise',controller.revise.getInfo)

module.exports = router