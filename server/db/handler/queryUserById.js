var User = require('../models/user')

// 根据id查询某用户是否在用户列表中，以及详细信息
const queryUserById = async (userId)=>{
    // console.log('query user:', userId);
    return await User.findOne({
        _id: userId
    }).lean()
}

module.exports = queryUserById;