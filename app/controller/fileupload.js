var xlsx = require('node-xlsx')
var fs = require('fs')

var fileupload ={}

fileupload.upload = function* (){
	console.log(" ########## POST /upload ####### ");  

	var uploadFile = this.request.body.files.resource.path

	const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(uploadFile));

	console.log(JSON.stringify(workSheetsFromBuffer))

	const data = workSheetsFromBuffer[0].data
	var buffer = xlsx.build([{name: "mySheetName", data: data}]);

	this.body = buffer;
	var filename = '考试报名信息.xlsx'
	this.set('Content-disposition', 'attachment; filename=',filename);
	this.set('Content-type', 'multipart/form-data');
}

fileupload.download = function* (){
	const data = [["aaa","bbb","ccc","ddd"],[111,222,333,444]]
	var buffer = xlsx.build([{name: "mySheetName", data: data}]);

	this.body = buffer;
	var filename = 'studentInfo.xlsx'
	this.set('Content-disposition', 'attachment; filename='+filename);
	this.set('Content-type', 'multipart/form-data');
}

module.exports = fileupload