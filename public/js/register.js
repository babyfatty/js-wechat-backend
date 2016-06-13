$('#submitBtn').on('click',function(){
	var param = $('#registerForm').serializeArray()
	var openid = $('#openid').val()
	console.log(param,openid)
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
  		console.log(response)
  		console.log(err)
  		window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b4f6ee3da84307c&redirect_uri=http%3A%2F%2F139.129.27.196%2Fsuccess&response_type=code&scope=snsapi_base&state=123#wechat_redirect")
	})
})

$('#registerForm').validator({
        errorCallback: function(unvalidFields){
            $(unvalidFields).each(function(i,item){
                console.log(item.$el[0])
            })
        }
        , isErrorOnParent: true
});