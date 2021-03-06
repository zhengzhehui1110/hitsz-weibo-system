var mongoose=require('mongoose');
var regs = require('../../global/regs')
var Schema=mongoose.Schema;

// 评论结构
const Comment = new Schema({
	text: {
        type: String,
        min: [1, '评论内容不能为空'],
        max: [50, '评论过长'],
        required: [true, '评论内容不能为空']
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
        required: true,
        default: Date.now()
    },
    avatar: {
        type: String,
        default: ''
    },
    fatherCommentId: { // 父评论
        type: String,
        default: '0',
    },
    fatherCommentAuthorName: { // 父评论的作者名称
        type: String,
        default: '',
    },
    articalId: { // 评论所属的动态
        type: Schema.Types.ObjectId, Number,
        required: [true, '评论缺少对应的动态'],
    }
})

module.exports = Comment;//导出