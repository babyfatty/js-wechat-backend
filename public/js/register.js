function vailTel(num){

	return true;
}
var telNum,isChecked=false
$('.codeArea').hide()
$('.checkCode').on('click',function(e){
	telNum = $('#tel').val()
	$('.successres').hide()
	$('.sendFailres').hide()
	$('.telFailres').hide()
	$('.successcode').hide()
	$('.codeFailres').hide()
	$('.deplFailres').hide()
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

$('#grade').change(function(e){
	console.log($(e.target).val())
	$('#highscname').val("")
	if($(e.target).val()>=10){
		$('#highscname').attr('required',true)
		$('#registerForm').validator()
	}else{
		$('#highscname').removeAttr('required')
		$('#registerForm').validator()
		if($("#highscname").hasClass('error')){
			$("#highscname").removeClass('error')
		}
		if($("#highscname").hasClass('empty')){
			$("#highscname").removeClass('empty')
		}
	}
})

$('#midsch').change(function(e){
	console.log($(e.target).val())
	$('#midschname').val('')
	if($(e.target).val()=="4"){
		$('#midschname').attr('required',true)
		$('#registerForm').validator()
	}else{
		$('#midschname').removeAttr('required')
		$('#registerForm').validator()
		if($("#midschname").hasClass('error')){
			$("#midschname").removeClass('error')
		}
		if($("#midschname").hasClass('empty')){
			$("#midschname").removeClass('empty')
		}
	}
})

$('#registerForm').submit(function(e){
	e.preventDefault()
})

$('#registerForm').validator({
        errorCallback: function(unvalidFields){
        	console.log(unvalidFields)
            $(unvalidFields).each(function(i,item){
                console.log(item.$el[0])
            })
        }
        , isErrorOnParent: true
        , after : function(){
        	if(isChecked){
        		$('#loadingToast').show()
		    	var param = $('#registerForm').serializeArray()
				var openid = $('#openid').val()
				$.post('http://aosaikang.xiaonian.me/api/student/add', { 
				 openid:openid,
				 "s.name":param[0].value,
				 "s.gender":param[1].value,
				 "s.grade":param[4].value,
				 "s.class":param[8].value,
				 "s.cz_school":param[7].value,
				 "s.cz_type":param[6].value,
				 "s.gz_school":param[5].value,
				 "s.city": param[3].value,
				 "s.birthday": param[2].value,
				 "s.parent_name": param[9].value,
				 "s.parent_phone": param[10].value
				}, function(response,err){
					if(response.code===0){
						$('#loadingToast').hide()
			  		window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab5e05ece55fcade&redirect_uri=http%3A%2F%2Faosaikangjs.xiaonian.me%2Fsuccess&response_type=code&scope=snsapi_base&state=123#wechat_redirect")
			  	}else{
			  		$('#loadingToast').hide()
			  		window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab5e05ece55fcade&redirect_uri=http%3A%2F%2Faosaikangjs.xiaonian.me%2Ffail&response_type=code&scope=snsapi_base&state=系统似乎出现了一点问题，程序员哥哥正在紧急修复#wechat_redirect")
			  	}
					
				})
    		}else{
    				$('.successres').hide()
	$('.sendFailres').hide()
	$('.telFailres').hide()
	$('.successcode').hide()
	$('.codeFailres').hide()
	$('.deplFailres').hide()
    			$('.codeFailres').show()
    		}
        	
	    }
	})