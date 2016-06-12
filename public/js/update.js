var temp = $('#prizeTmpl').html()

new Vue({
	el:'#prizeContainer',
	template:temp,
	data:{
		prizeList:[{
			catSelected:'数学',
			areaSelected:'全国',
			prizedate:'2015-05',
			prizename:'一等奖',
			show:false
		},{
			catSelected:'数学',
			areaSelected:'全国',
			prizedate:'2015-05',
			prizename:'二等奖',
			show:false
		},{
			catSelected:'数学',
			areaSelected:'全国',
			prizedate:'2015-05',
			prizename:'三等奖',
			show:false
		}],
		prizeAreas:[{
			value:'0',
			text:'全国',
		},{value:'1',
			text:'省'},{value:'2',
			text:'市'}],
		prizeCats:[{value:'0',
			text:'数学'},{value:'1',
			text:'语文'},{value:'2',
			text:'信息（含机器人）'},{value:'3',
			text:'音乐（含乐器和声乐）'},{value:'4',
			text:'棋类'},{value:'5',
			text:'体育运动'},{value:'6',
			text:'英语'}]
	},
	methods:{
		addPrize: function(){
			var text = {
				catSelected:"",
				areaSelected:"",
				prizedate:'',
				prizename:'',
				show:true,
				newAdd:true
			}
			this.prizeList.unshift(text)
		},
		removePrize: function(index,prize){
			this.prizeList.$remove(prize)
		},
		editPrize: function(index,prize){
			this.cacheData = {
				catSelected: prize.catSelected,
				areaSelected:prize.areaSelected,
				prizedate:prize.prizedate,
				prizename:prize.prizename,
			}
			prize.show = true
		},
		cancelEdit: function(index,prize){
			prize.show = false
			if(!!prize.newAdd){
				this.prizeList.$remove(prize)
			}else{
				prize.catSelected = this.cacheData.catSelected
				prize.areaSelected = this.cacheData.areaSelected
				prize.prizedate = this.cacheData.prizedate
				prize.prizename = this.cacheData.prizename
			}
			this.cacheData = null
		},
		savePrize: function(index,prize){
			if(!!prize.newAdd){
				delete prize.newAdd
			console.log(prize)
			}else{

			}
			console.log(prize)
			prize.show = false
		}
	}
})