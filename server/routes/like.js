var express = require('express');
var router = express.Router();
var Artical = require('../db/models/artical')
var User = require('../db/models/user')
var Like = require('../db/models/like')
var errHandler = require('../global/errHandler')
// 查询该用户是否存在
var isUserExist = require('../db/handler/queryUserById');
const artical = require('../db/schemas/artical');

// 添加点赞或踩的记录
router.post('/likeArtical', async (req, res, next)=>{
    var like = req.body

    var user = await isUserExist(like.user)
    if (!user || !user.state) {
        return errHandler('用户未登录', user, res, '请重新登录')
    }

    // 先查询是否已存在记录
    var result = await Like.findOne(
        {
            user: like.user,
            artical: like.artical
        }
    )
    
    console.log('find like record:', result);
    
    if(!result) { // 如果不存在则新增一条
        var newLike = new Like({
            ...like
        })
        console.log('new like:', newLike);
        newLike.save((err)=>{
            errHandler(err, newLike, res)
        })
    }

    else if (result.isLike===like.isLike) { // 如果用户第二次重复选择了赞或踩，视为取消点赞，删除相关记录
        let deleteRes = await Like.deleteMany(
            {
                user: like.user,
                artical: like.artical
            }
        ).exec((err, data)=>{
            console.log('delete like:', data);
            errHandler(err, data, res)
        })
    }

    else { // 如果用户的选择和上一次不同，则修改已有记录
        let addRes = await Like.findOneAndUpdate(
            {
                user: like.user,
                artical: like.artical
            },
            {
                $set: {
                    isLike: like.isLike
                }
            }
        ).exec((err, data)=>{
            console.log('update like:', data);
            errHandler(err, data, res)
        })
        // console.log('update like:',addRes);
        // errHandler(!addRes, addRes, res)
        
    }
    
})

// 查询一条点赞记录
router.post('/query', async (req, res, next)=>{
    var like = req.body
    console.log('like record:', like);

    var result = await Like.findOne(
        {
            user: like.user,
            artical: like.artical
        }
    )
    errHandler(null, result, res)

})

module.exports = router;
