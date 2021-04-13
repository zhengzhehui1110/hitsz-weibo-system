var User = require('../models/user')

// 根据用户id修改用户的登陆状态
const changeUserState = async (userId, isOnline)=>{
    // console.log('query user:', userId);
    return await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                state: isOnline,
            }
        }
    )
}

module.exports = changeUserState;