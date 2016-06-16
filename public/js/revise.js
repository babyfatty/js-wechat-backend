var schools=['树人','南外','金陵汇文','二十九中','其他']

function vailTel(num){

	return true;
}
var telNum 
var hasTel 
var isChecked = false

function getCheck(){
	return ($('#tel').val() == $('#tel').attr('data-tel'))
}

$('.codeArea').hide()

$('#grade').change(function(e){
	console.log($(e.target).val())
	$('#highscname').val("")
	if($(e.target).val()>=10){
		$('#highscname').attr('required',true)
		$('#registerForm').validator()
	}else{
		$('#highscname').attr('required',null)
		$('#registerForm').validator()
	}
})

$('#midsch').change(function(e){
	console.log($(e.target).val())
	$('#midschname').val('')
	if($(e.target).val()=="4"){
		$('#midschname').attr('required',true)
		$('#registerForm').validator()
	}else{
		$('#highscname').attr('required',null)
		$('#registerForm').validator()
	}
})

$('.checkCode').on('click',function(e){
	telNum = $('#tel').val()
	$('.successres').hide()
	$('.sendFailres').hide()
	$('.telFailres').hide()
	$('.successcode').hide()
	$('.codeFailres').hide()
	$('.deplFailres').hide()
	$('.samePhoneFailres').hide()
	if(getCheck()){
		$('.samePhoneFailres').show()
	}else{
		if(vailTel(telNum)){
		$.get('http://aosaikang.xiaonian.me/api/student/sendBindCaptcha?phone='+telNum,function(res,status){
			if(res.code===0){
				$('.successres').show()
				$('.codeArea').show()
			}
			else if(res.code===1){
				$('.deplFailres').show()
			}
			else{
				$('.sendFailres').show()
			}
		})
		}else{
			$('.telFailres').show()
		}
	}
	
})

$('.gocheck').on('click',function(e){
	$('.successres').hide()
	$('.sendFailres').hide()
	$('.telFailres').hide()
	$('.successcode').hide()
	$('.codeFailres').hide()
	$('.deplFailres').hide()
	var code = $('#code').val()
	if(!telNum){
		telNum = $('#tel').val()
	}
	$.get('http://aosaikang.xiaonian.me/api/student/checkBindCaptcha?delete=true',{
		phone:telNum,
		code:code
	},function(res){
		if(res.code=="0"){
				$('.successcode').show()
				isChecked = true
			}else{
				$('.codeFailres').show()
			}
	})
})


$('#updateForm').submit(function(e){
	e.preventDefault()
})
$('#updateForm').validator({
		isErrorOnParent: true
        , after : function(){
		if(isChecked || getCheck()){
	    	var openid = $('#openid').val()
			var id = $('#sid').val()
			var param = $('#updateForm').serializeArray()
			var s = {}
			$('#loadingToast').show()
			$.post('http://aosaikang.xiaonian.me/api/student/update', { 
			 "s.id":parseInt(id),
			 "s.grade":param[1].value,
			 "s.class":param[5].value,
			 "s.cz_school":param[4].value,
			 "s.cz_type":param[3].value,
			 "s.gz_school":param[2].value,
			 "s.city": param[0].value,
			 "s.parent_name": param[6].value,
			 "s.parent_phone": param[7].value
			}, function(response,err){
				if(response.code===0){
						$('#loadingToast').hide()
			  		window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab5e05ece55fcade&redirect_uri=http%3A%2F%2Faosaikangjs.xiaonian.me%2Fsuccess&response_type=code&scope=snsapi_base&state=123#wechat_redirect")
			  	}else{
			  		$('#loadingToast').hide()
			  		window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab5e05ece55fcade&redirect_uri=http%3A%2F%2Faosaikangjs.xiaonian.me%2Ffail&response_type=code&scope=snsapi_base&state=123#wechat_redirect")

			  	}
			})
		}else{
				$('.successres').hide()
				$('.sendFailres').hide()
				$('.telFailres').hide()
				$('.successcode').hide()
				$('.codeFailres').hide()
				$('.deplFailres').hide()
				$('.samePhoneFailres').hide()
			$('.codeFailres').show()
		}
    }

})