var mongoose=require('mongoose');
var UserSchema = require('../schemas/user')

var User = mongoose.model('User', UserSchema);

// // 创建文档
// const allUsersFile = new allUsers({
// 	name: 'allUsersTest',
// 	author: 'zzh',
// 	isPublished: true
// });
// // 将文档插入到数据库中
// course.save();

module.exports = User;