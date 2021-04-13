var mongoose=require('mongoose');
var regs = require('../../global/regs');
var Schema=mongoose.Schema;

// 定义一条动态的结构
const artical = new Schema({
    text: {
        type: String,
        min: [1, '动态内容不能为空'],
        max: [140, '动态过长'],
        required: [true, '动态内容不能为空']
    },
    authorId: {
        type: Schema.Types.ObjectId,
        required: [true, '非法用户'],
    },
    authorName: {
        type: String,
        min: 1,
        max: 10,
        default: '匿名用户',
        match: [regs.userName, '用户名格式错误']
    },
    postTime: {
        type: Date,
        require: true,
        default: Date.now()
    },
    avatar: {
        type: String,
        default: ''
    },
    pic: {
        type: String,
        default: '',
    }
})

module.exports = artical;