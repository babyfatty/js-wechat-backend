var xlsx = require('node-xlsx')
var fs = require('fs')
var request = require('koa-request')

function* getCompeid(){
  var useroption =" http://aosaikang.xiaonian.me/api/competition/getCurrentCompetition"
  var info = yield request(useroption)
  var comp = JSON.parse(info.body)
  if(typeof comp.errorMsg =="string" || typeof info.devErrorMsg =="string" ){
    return false
  }else{
    comp = comp.data.competition
    return comp
  }
}

function* getCompetitions(compid){
	console.log(compid.id)
  var useroption ="http://aosaikang.xiaonian.me/api/admin/exportEnrollments?competition="+compid.id
  var info = yield request(useroption)
  var comp = JSON.parse(info.body)
  if(typeof comp.errorMsg =="string" || typeof info.devErrorMsg =="string" ){
    return false
  }else{
    return comp.data.enrollments
  }
}


var fileupload ={}

fileupload.upload = function* (){
	console.log(" ########## POST /upload ####### ");  
	var competition = yield getCompeid()

	var uploadFile = this.request.body.files.resource.path

	const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(uploadFile));

	var uploadData = JSON.parse(JSON.stringify(workSheetsFromBuffer))[0].data
	var scoreObj = {}
	var seatObj = {}
	uploadData.shift()
	for(var temarr of uploadData){
		scoreObj[temarr[7]] = temarr[0]
		seatObj[temarr[7]] = temarr[4]
	}
	var seatOption = {
	  url:"http://aosaikang.xiaonian.me/api/admin/importExamInfo",
	  method:'post',
	  qs: {
	        competition: competition.id
	        ,
	        map: JSON.stringify(seatObj)
	      }
	}
	var scoreOption = {
	  url:"http://aosaikang.xiaonian.me/api/admin/importScore",
	  method:'post',
	  qs: {
	        competition: competition.id
	    	,
	        map: JSON.stringify(scoreObj)
	      }
	}
    var seatInfo = yield request(seatOption)
    var scoreInfo = yield request(scoreOption)
    this.body={"code":0,"data":{"success":true}}

}

fileupload.download = function* (){
	var competition = yield getCompeid()

	var comps = yield getCompetitions(competition)
	for(var comp of comps){
		comp.studentSchool = comp['student']['cz_school']
		comp.grade = comp['student'].grade
		comp.id = comp['student'].id
	}
	var tempData = []
	var downData = []
	for(var key of Object.keys(comps[0])){
		tempData.push(key)
	}
	downData.push(tempData)
	tempData = []
	for(var comp of comps){
		for(var item in comp){
			if(item === "student" ){
				tempData.push(comp[item].name)
			}else{
				tempData.push(comp[item])			
			}
		}
		downData.push(tempData)
		tempData = []
	}
	
	var buffer = xlsx.build([{name: "register", data: downData}]);
	this.body = buffer;
	var filename = 'studentInfo.xlsx'
	this.set('Content-disposition', 'attachment; filename='+filename);
	this.set('Content-type', 'multipart/form-data');
}

module.exports = fileupload