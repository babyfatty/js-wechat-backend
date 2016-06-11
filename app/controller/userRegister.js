var user = require('../model/user')
module.exports = function* (ctx,next){
	console.log('userRegiser',this.request.body)
	yield user.create({
	  username: 'John',
	  openid: '1789231',
	  gender: 'female',
	  birthdate: '2011-01-01',
	  area: "1",
	  grade: "1",
	  highschool: '123',
	  midschool: "1",
	  midschoolname: '123',
	  classroom: '123',
	  parentname: '123',
	  parenttel: '213',
  });
	var a = yield user.findOne({openid:"123"})
	console.warn('a',a)
	this.body = a
}