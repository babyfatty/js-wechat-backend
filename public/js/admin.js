$("#resource").fileinput({
	uploadUrl:'/fileupload',
	allowedFileExtensions:['xlsx'],
	'showPreview' : false
});

var telNumbers = window.telNumbers;

$('#smsForm').submit(function(e){
	e.preventDefault()
})

var successTmpl = '<div class="alert alert-success alert-dismissible" role="alert">'+
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
    '<strong>Success!</strong> 短信发送成功</div>'
var failTmpl ='<div class="alert alert-danger alert-dismissible" role="alert">'+
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
    '<strong>Warning!</strong> 短信发送失败'
$('#smsForm').validator({
    after : function(){
    	var formparams = $('#smsForm').serializeArray()
		var params = {
			"product":formparams[0].value.trim(),
			"code":formparams[1].value.trim()
		}
		var sign = formparams[2].value.trim()
		var template = formparams[3].value.trim()
		console.log(params,sign,template)

		var tels = JSON.stringify(window.telNumbers) || ['13222001020']
		$.get('http://aosaikang.xiaonian.me/api/sms/sendSms?phones='+tels+'&params='+JSON.stringify(params)+'&sign='+sign+'&template='+template,function(res){
			console.log(res)
			if(res.code==0){
				$('#warnMsg').html(successTmpl)
			}else{
				if(!!res.errorMsg){
					$('#warnMsg').html(failTmpl+'<span>'+res.errorMsg+'</span></div>')
				}else{
					$('#warnMsg').html(failTmpl+'</div>')
				}
			}
		})	
    }
})