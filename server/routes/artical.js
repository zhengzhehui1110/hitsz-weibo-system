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
            errHandler(req.body, artical, res)
        })
    }
    else {
        errHandler('用户未登录', artical, res, '请重新登录')
    }
})

// 查询某个用户的动态
router.post('/getArticalsByUser', async (req, res, next)=>{
    // 首先查看用户是否已登录
    var userInfo = req.body
    console.log(userInfo);
    var user = await isUserExist(userInfo._id)
    if(user && user.state){
        var articals = await Artical.find(
            {
                authorId: userInfo._id
            }
        ).sort(
            {
                postTime: -1,
            }
        )
        console.log('get articals:', userInfo, articals);
        if(articals) {
            errHandler(null, articals, res)
        }
        else errHandler('查询失败', articals, res, '查询失败')
    }
    
    else errHandler('未登录', articals, res, '未登录')
})

module.exports = router;
