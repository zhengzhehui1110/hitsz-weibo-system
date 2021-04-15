var express = require('express');
var router = express.Router();
var Artical = require('../db/models/artical')
var User = require('../db/models/user')
var errHandler = require('../global/errHandler')
// 查询该用户是否存在
var isUserExist = require('../db/handler/queryUserById')

// 发布一条动态
router.post('/post', async (req, res, next)=>{
    // var artical = new Artical({
    //     text: '测试发布动态3',
    //     authorId: '60753a970862a540f0dbf952',
    //     authorName: 'akaneovo',
    //     postTime: Date.now(),
    // })
    var artical = new Artical({
        ...req.body
    })

    // var isUser = isUserExist(artical.authorId)
    var user = await isUserExist(artical.authorId)
    // 只有用户存在且在线，才能发送文章
    if(user && user.state){
        console.log('new artical:', artical);

        artical.save((err)=>{
            errHandler(err, artical, res)
        })
    }
    else {
        errHandler('用户未登录', artical, res, '请重新登录')
    }
})

// 查询某个用户的动态
router.post('/getArticalsByUser', async (req, res, next)=>{
    // 首先查看用户是否存在
    var userInfo = req.body
    console.log(userInfo);
    var user = await isUserExist(userInfo._id || userInfo.userId)
    if(user){
        var articals = await Artical.find(
            {
                authorId: user._id
            }
        ).sort(
            {
                postTime: -1,
            }
        )
        console.log('get articals:', user, articals);
        errHandler(null, articals, res)

    }
    
    else errHandler('用户不存在', articals, res, '用户不存在')
})

// 按内容查询动态
router.post('/getArticalsByText', async(req, res, next) => {
    var exp = req.body.exp.toString()
    exp = new RegExp(exp, 'i')
    console.log('exp', exp);
    var articals = await Artical.find(
        {
            text: exp
        }
    ).sort(
        {
            postTime: -1
        }
    )
    console.log('get articals:', articals);
    errHandler(null, articals, res)


})

module.exports = router;
