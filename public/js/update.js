var temp = $('#prizeTmpl').html()
Vue.filter('fullArea', function (value) {
  	return this.prizeAreas[value].text
})
Vue.filter('fullCats', function (value) {
  	return this.prizeCats[value].text
})

var schools=['树人','南外','金陵汇文','二十九中','其他']

$('#editHonourForm').validator({
	errorCallback: function(unvalidFields){
		console.log(unvalidFields)
	    $(unvalidFields).each(function(i,item){
	        console.log(item.$el[0])
	    })
	}
	, isErrorOnParent: true
})

Vue.filter('schoolfilter', function (value) {
  	return schools[value]
})
new Vue({
	el:'#prizeContainer',
	template:temp,
	data:{
		prizeList: JSON.parse(JSON.stringify(window.prizeList)),
		prizeAreas:[{
			value:0,
			text:'全国',
		},{value:1,
			text:'省'},{value:2,
			text:'市'}],
		prizeCats:[{value:0,
			text:'数学'},{value:1,
			text:'语文'},{value:2,
			text:'信息（含机器人）'},{value:3,
			text:'音乐（含乐器和声乐）'},{value:4,
			text:'棋类'},{value:5,
			text:'体育运动'},{value:6,
			text:'英语'}]
	},
	methods:{
		addPrize: function(){
			var text = {
				type:"0",
				area:"0",
				time:'',
				content:'',
				show:true,
				newAdd:true,
				showAlarm:false,
				check : false
			}
			this.prizeList.unshift(text)
		},
		removePrize: function(index,prize){
			if(!!prize.newAdd){
				this.prizeList.$remove(prize)
			}else{
				$.post('http://aosaikang.xiaonian.me/api/reward/delete',{
					"r.id":prize.id
				},function(res,status){
					console.log(res)
					console.log(status)
				})
				this.prizeList.$remove(prize)
			}
		},
		editPrize: function(index,prize){
			prize.show = true
			var prize = JSON.parse(JSON.stringify(prize))
			this.cacheData = {
				type: prize.type,
				area:prize.area,
				time:prize.time,
				content:prize.content,
			}
		},
		cancelEdit: function(index,prize){
			prize.show = false
			if(!!prize.newAdd){
				this.prizeList.$remove(prize)
			}else{
				prize.type = this.cacheData.type
				prize.area = this.cacheData.area
				prize.time = this.cacheData.time
				prize.content = this.cacheData.content
			}
			this.cacheData = null
		},
		savePrize: function(index,prize,event){
			var newprize = JSON.parse(JSON.stringify(prize))
			if(!!prize.newAdd){
                if(!!newprize.content.trim()&&!!newprize.time.trim()){
                	$('#loadingToast').show()
                	delete prize.newAdd
                	$.post('http://aosaikang.xiaonian.me/api/reward/add',{
	                  "r.student":parseInt($('#sid').val()),
	                  "r.type":newprize.type,
	                  "r.time":newprize.time,
	                  "r.area":newprize.area,
	                  "r.content":newprize.content
	                },function(res,status){
	                	$('#loadingToast').hide()
	                  console.log(res)
	                  console.log(status)
	                })
              		prize.show = false
                }else{
                	prize.check = true
                }
              }else{
                if(!!newprize.content.trim()){
                	$('#loadingToast').show()
	                $.post('http://aosaikang.xiaonian.me/api/reward/update',{
	                  "r.id":newprize.id,
	                  "r.student":parseInt($('#sid').val()),
	                  "r.type":newprize.type,
	                  "r.time":newprize.time,
	                  "r.area":newprize.area,
	                  "r.content":newprize.content
	                },function(res,status){
	                	$('#loadingToast').hide()
	                  console.log(res)
	                  console.log(status)
	                })
	              	prize.show = false
	            }else{
	            	prize.check = true
                }  	
             }
		}
	}
})
$('#updateForm').submit(function(e){
	e.preventDefault()
})
$('#updateForm').validator({
        errorCallback: function(unvalidFields){
        	console.log(unvalidFields)
            $(unvalidFields).each(function(i,item){
                console.log(item.$el[0])
            })
        }
        , isErrorOnParent: true
        , after : function(){
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
				$('#loadingToast').hide()
		  		window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab5e05ece55fcade&redirect_uri=http%3A%2F%2Faosaikangjs.xiaonian.me%2Fsuccess&response_type=code&scope=snsapi_base&state=123#wechat_redirect")
			})
		    }
	})

// $('#submitBtn').on('click',function(){
// 	var openid = $('#openid').val()
// 	var id = $('#sid').val()
// 	var param = $('#updateForm').serializeArray()
// 	var s = {}
// 	$.post('http://aosaikang.xiaonian.me/api/student/update', { 
// 	 "s.id":parseInt(id),
// 	 "s.grade":param[1].value,
// 	 "s.class":param[5].value,
// 	 "s.cz_school":param[4].value,
// 	 "s.cz_type":param[3].value,
// 	 "s.gz_school":param[2].value,
// 	 "s.city": param[0].value,
// 	 "s.parent_name": param[6].value,
// 	 "s.parent_phone": param[7].value
// 	}, function(response,err){
//   		window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab5e05ece55fcade&redirect_uri=http%3A%2F%2Faosaikangjs.xiaonian.me%2Fsuccess&response_type=code&scope=snsapi_base&state=123#wechat_redirect")
// 	})
// })