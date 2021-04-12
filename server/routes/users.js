var express = require('express');
var router = express.Router();
var User = require('../db/models/user')
var errHandler = require('../global/errHandler')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/test', function(req, res, next) {
  errHandler(!req, '网络测试正常', res)
});

 // 用户注册
router.post('/signup',(req,res,next)=>{
  var user = new User({
    ...req.body
  })

  console.log('new user:', user)

  user.save((err)=>{
    errHandler(err, user, res)
  })
})

// 用户登录
router.post('/login',(req,res,next)=>{
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
  ).exec((error,result)=>{
    // 不知为啥error无论如何都是null
    console.log('login find:', error, result);
    if (!result) errHandler(!result, result, res, '该用户不存在')
    else if (result.password !== userInfo.password) errHandler(result, result, res, '密码错误')
    else errHandler(error, result, res)
  })

})

module.exports = router;
