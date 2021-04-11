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
  // var user = new User({
  //        username:'admin',
  //        password:'123'
  //    });
  // console.log('post signup', req.body);

  var user = new User({
    ...req.body
  })

  console.log('new user:', user)

  user.save((err)=>{
    errHandler(err, 'data test', res)
  })
})

module.exports = router;
