var temp = $('#prizeTmpl').html()
Vue.filter('fullArea', function (value) {
	if(!!this.prizeAreas[value]){
  		return this.prizeAreas[value].text
	}
})
Vue.filter('fullCats', function (value) {
	if(!!this.prizeCats[value]){
  		return this.prizeCats[value].text
	}
})
Vue.filter('fullRank', function (value) {
	if(!!this.prizeRanks[value]){
		console.log(value)
  		return this.prizeRanks[value].text
	}
})
Vue.filter('schoolfilter', function (value) {
	if(!!schools){
  		return schools[value]
	}
})
new Vue({
	el:'#prizeContainer',
	template:temp,
	data:{
		prizeList: JSON.parse(JSON.stringify(window.prizeList)),
		zkscore: window.zkscore,
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
			text:'英语'}],
		prizeRanks:[
			{
				value:0,
				text:'特等奖'
			},{
				value:1,
				text:'一等奖'
			},{
				value:2,
				text:'二等奖'
			},{
				value:3,
				text:'三等奖'
			},{
				value:4,
				text:'其他奖项'
			}
		]	
	},
	methods:{
		addPrize: function(){
			var text = {
				type:"0",
				area:"0",
				time:'',
				reward_type:'0',
				content:'',
				show:true,
				newAdd:true,
				showAlarm:false,
				fcheck : false,
				tcheck:false
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
		Fieldclick:function(prize){
			prize.fcheck = false
		},
		Timeclick:function(prize){
			prize.tcheck = false
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
	                  "r.reward_type":newprize.reward_type,
	                  "r.content":newprize.content
	                },function(res,status){
	                	$('#loadingToast').hide()
	                  console.log(res)
	                  console.log(status)
	                })
              		prize.show = false
              		prize.tcheck = false
              		prize.fcheck = false
                }else{
                	if(!newprize.content.trim()){
                	 prize.fcheck = true
                	}
                    if(!newprize.time.trim()){
                	 prize.tcheck = true                    	
                    }
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
	                  "r.reward_type":newprize.reward_type,
	                  "r.content":newprize.content
	                },function(res,status){
	                	$('#loadingToast').hide()
	                  console.log(res)
	                  console.log(status)
	                })
	              	prize.show = false
	              	prize.tcheck = false
              		prize.fcheck = false
	            }else{
	            	if(!newprize.content.trim()){
                	prize.fcheck = true
                	}
                    if(!newprize.time.trim()){
                	prize.tcheck = true                    	
                    }
                }  	
             }
		}
	}
})
$('body').on('click','.weui_input',function(e){
	if($(e.target).parent().hasClass('error')){
		$(e.target).parent().removeClass('error')
	}
})
$('#submitBtn').on('click',function(){
	window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab5e05ece55fcade&redirect_uri=http%3A%2F%2Faosaikangjs.xiaonian.me%2Fsuccess&response_type=code&scope=snsapi_base&state=123#wechat_redirect")
})
$('#editHonourForm').submit(function(e){
	e.preventDefault()
})
$('#editHonourForm').validator({
	errorCallback: function(unvalidFields){
		console.log(unvalidFields)
	    $(unvalidFields).each(function(i,item){
	        console.log(item.$el[0])
	    })
	}
	, isErrorOnParent: true
})