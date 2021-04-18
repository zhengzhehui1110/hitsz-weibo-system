var mongoose=require('mongoose');
var regs = require('../../global/regs')
var Schema=mongoose.Schema;

// 点赞列表
const Like = new Schema({
	user: { // 用户id
        type: Schema.Types.ObjectId,
        required: true,
    },
    artical: { // 文章id
        type: Schema.Types.ObjectId,
        required: true,
    },
    isLike: { // 赞：true，踩：false
        type: Boolean,
        default: true,
    },
})

module.exports = Like;//导出