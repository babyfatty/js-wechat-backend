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
	 "s.cz_school":param[6].value==="其他"?param[7].value:param[6].value,
	 "s.gz_school":param[5].value,
	 "s.city": param[3].value,
	 "s.birthday": param[2].value,
	 "s.parent_name": param[9].value,
	 "s.parent_phone": param[10].value
	}, function(response,err){
  		console.log(response)
  		console.log(err)
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