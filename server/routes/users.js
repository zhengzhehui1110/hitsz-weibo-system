var express = require('express');
var router = express.Router();
var User = require('../db/models/user')
var errHandler = require('../global/errHandler')
var changeUserState = require('../db/handler/changeUserState')
var isUserExist = require('../db/handler/queryUserById')


router.get('/test', function(req, res, next) {
  errHandler(!req, '网络测试正常', res)
});

 // 用户注册
router.post('/signup',async (req,res,next)=>{
  var user = new User({
    ...req.body
  })

  console.log('new user:', user)

  user.save((err)=>{
    errHandler(err, user, res)
  })
})

// 用户登录
router.post('/login',async (req,res,next)=>{
  let userInfo = req.body

  User.findOne(
    {
      $or: [
        {
          'email': userInfo.user
        },
        {
          'mobile': userInfo.user
        }
      ]
    }
  ).exec(async (error,result)=>{
    // 不知为啥error无论如何都是null
    console.log('login find:', error, result);
    if (!result) errHandler(!result, result, res, '该用户不存在')
    else if (result.password !== userInfo.password) errHandler(result, result, res, '密码错误')
    else {
      await changeUserState(result._id, true) // 用户状态修改为在线
      errHandler(error, result, res)
    }
  })

})

// 用户退出
router.post('/exit', async (req,res,next)=>{
  let userInfo = req.body
  console.log('user exit:', userInfo);
  var user = await changeUserState(userInfo._id, false) // 用户状态改为下线
  errHandler(!user, user, res)
})

// 查询某个用户的具体信息
router.post('/query', async (req,res,next)=>{
  var user = await isUserExist(req.body.userId || req.body._id)
  if (user) {
    user.password = '****' // 避免暴露用户的密码
    errHandler(null, user, res)
  }
  else errHandler('查无此人', null, res, '查无此人')

})

module.exports = router;
