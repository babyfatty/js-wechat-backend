var temp = $('#prizeTmpl').html()

new Vue({
	el:'#prizeContainer',
	template:temp,
	data:{
		name:"babyfat",
		prizeList:[{a:1},{a:1}]
	},
	methods:{
		addPrize: function(){
			var text = {a:1,a:2}
			this.prizeList.push(text)
		},
		removePrize: function(index){
			this.prizeList.splice(index,1)
		}
	}
})