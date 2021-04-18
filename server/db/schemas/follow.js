var mongoose=require('mongoose');
var regs = require('../../global/regs')
var Schema=mongoose.Schema;

// 关注列表
const Follow = new Schema({
	follower: { // 关注者
        type: Schema.Types.ObjectId,
        required: true,
    },
    followee: { // 被关注者
        type: Schema.Types.ObjectId,
        required: true,
    },
    isSpecial: {
        type: Boolean,
        default: false,
    },
})

module.exports = Follow;//导出