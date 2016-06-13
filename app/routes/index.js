var router = require('koa-router')();

var controller = require('../controller')

router.get('/update',controller.update.getInfo)

router.get('/register',controller.register.getInfo)

router.get('/admin',controller.admin)

router.post('/wechat',controller.wechat)

router.post('/fileupload',controller.fileupload.upload)

router.get('/downloadFile',controller.fileupload.download)

router.get('/admin',controller.admin)

router.get('/success',controller.success)

router.get('/check',function*(){
	this.body = this.query.echostr
})

module.exports = router