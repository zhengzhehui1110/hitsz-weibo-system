// 定义用户的相关信息结构
var mongoose=require('mongoose');
var regs = require('../../global/regs')
var Schema=mongoose.Schema;

const User = new Schema({
	userName:{ 
        type: String, 
        min: 1, 
        max: 10, 
        required: [true, '用户名不能为空'], 
        default:'未命名',
        match: [regs.userName, '用户名格式错误']
    },
	gender: {
        type: String, 
        default:'M', 
        enum: ['M', 'F']
    },
	cover_pic: {
        type: String
    },
	avatar: {
        type: String
    },
    email: {
        type: String, 
        min: 1, 
        max: 50, 
        required: [true, '邮箱不能为空'], 
        match: [regs.email, '邮箱格式错误'], 
        unique: true
    },
    slogan: {
        type: String,
        min: 0, 
        max: 100, 
        default:''
    },
    mobile: {
        type: String, 
        required: [true, '手机号不能为空'], 
        default:'13600000000', 
        match: [regs.mobile, '手机号格式错误'], 
        unique: true
    },
    password: {
        type: String, 
        min: 8, 
        max: 20, 
        required: [true, '密码不能为空'], 
        default:'12345678'
    },
})

module.exports = User;//导出