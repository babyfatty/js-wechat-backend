var xlsx = require('node-xlsx')
var fs = require('fs')
var request = require('koa-request')
var config = require('../../config')

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
	var scoreI = {}
	var scoreII = {}
	var scoreIII = {}
	var seatObj = {}
	var codeObj = {}

	uploadData.shift()

	for(var temarr of uploadData){
		console.log(temarr)
		seatObj[temarr[1]] = temarr[7]
		scoreI[temarr[1]] = temarr[8]
		scoreII[temarr[1]] = temarr[9]
		scoreIII[temarr[1]] = temarr[10]
		codeObj[temarr[1]] = temarr[11]
	}
 
	console.log(uploadData)


	var seatOption = {
	  url:"http://aosaikang.xiaonian.me/api/admin/importExamInfo",
	  method:'post',
	  qs: {
	        competition: competition.id
	        ,
	        map: JSON.stringify(seatObj)
	      }
	}
	var scoreIOption = {
	  url:"http://aosaikang.xiaonian.me/api/admin/importScore",
	  method:'post',
	  qs: {
	        competition: competition.id
	    	,
	        map: JSON.stringify(scoreI)
	        ,
	        key: 'score_a'
	      }
	}
		console.log(JSON.stringify(scoreI))
	var scoreIIOption = {
	  url:"http://aosaikang.xiaonian.me/api/admin/importScore",
	  method:'post',
	  qs: {
	        competition: competition.id
	    	,
	        map: JSON.stringify(scoreII)
	        ,
	        key: 'score_b'
	      }
	}
	console.log(JSON.stringify(scoreII))
	var scoreIIIOption = {
	  url:"http://aosaikang.xiaonian.me/api/admin/importScore",
	  method:'post',
	  qs: {
	        competition: competition.id
	    	,
	        map: JSON.stringify(scoreIII)
	        ,
	        key: 'score_c'
	      }
	}
	console.log(JSON.stringify(scoreIII))
	var codeOption = {
		url:"http://aosaikang.xiaonian.me/api/admin/importExamCode",
		method:'post',
		qs: {
	        competition: competition.id
	        ,
	        map: JSON.stringify(codeObj)
	      }
	}

    var seatInfo = yield request(seatOption)
    var scoreIInfo = yield request(scoreIOption)
    var scoreIIInfo = yield request(scoreIIOption)
    var scoreIIIInfo = yield request(scoreIIIOption)
    var codeInfo = yield request(codeOption)
    console.log(seatInfo.body,scoreIInfo.body,scoreIIInfo.body,scoreIIIInfo.body,codeInfo.body)
	this.body={}
    
}

fileupload.download = function* (){
	var competition = yield getCompeid()
	var tempcomps = yield getCompetitions(competition)
	if(tempcomps.length===0){
		this.body = {
			message:'暂无学生信息'
		}
		return false
	}
	var tempSingleData = {}
	var comps = []
	for(var comp of tempcomps){
		comp['初中学校'] = comp['student']['cz_school'] || config.school.names[comp['student'].cz_type].text
		tempSingleData ={
			'姓名':comp.student,
			'学生id':comp['student'].id,
			'性别':comp['student'].gender?'男':'女',
			'初中学校':comp['初中学校'],
			'年级':comp['student'].grade,
			'报名时间':comp.create_time,
			'竞赛组别':comp.competition,
			'考场':comp.exam_info,
			'考核I成绩':comp.score_a,
			'考核II成绩':comp.score_b,
			'竞赛成绩':comp.score_c,
			'准考证号':comp.code 
		}
		comps.push(tempSingleData)
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
			if(item === "姓名" ){
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