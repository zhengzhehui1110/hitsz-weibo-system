var express = require('express');
var router = express.Router();
var Artical = require('../db/models/artical')
var User = require('../db/models/user')
var Follow = require('../db/models/follow')
var errHandler = require('../global/errHandler')
// 查询该用户是否存在
var isUserExist = require('../db/handler/queryUserById')

// 新增一个关注记录
router.post('/followUser', async (req, res, next)=>{
    var follow = new Follow({
        ...req.body
    })
    var user = await isUserExist(follow.follower)
    if(user && user.state) {
        console.log('new follow:', follow);
        follow.save((err)=>{
            errHandler(err, follow, res)
        })

    }
    else {
        errHandler('用户未登录', follow, res, '请重新登录')
    }
})

// 取消关注一个用户
router.post('/deleteFollowUser', async (req, res, next)=>{
    var disFollow = req.body
    var user = await isUserExist(disFollow.follower)
    if(user && user.state) {
        let result = await Follow.deleteMany(
            {
                follower: disFollow.follower,
                followee: disFollow.followee,
            }
        )
        console.log('delete follow:', result);

        errHandler(result.deletedCount<1, result, res, result.deletedCount>0?null:'没有该关注记录')

    }
    else {
        errHandler('用户未登录', follow, res, '请重新登录')
    }
})


// 查询一条关注记录
router.post('/isFollow',  async (req, res, next)=> {
    var follow = req.body
    console.log('is follow:', follow);
    var result = await Follow.findOne(
        {
            ...follow
        }
    )
    errHandler(null, result, res)
})

// 查询某个用户所有关注的人
router.post('/queryFolloweeByUser', async (req, res, next)=> {
    var userId = req.body._id
    var result = await Follow.find(
        {
            follower: userId
        }
    ).lean()
    console.log('query followee by user', result)
    var promises = result.map(async item=>{
        let userInfo = await isUserExist(item.followee)
        return userInfo
    })

    var followeeList = await Promise.all(promises)

    errHandler(null, followeeList, res)

})

// 查询关注某个用户的人
router.post('/queryFollowerByUser', async (req, res, next)=> {
    var userId = req.body._id
    var result = await Follow.find(
        {
            followee: userId
        }
    ).lean()
    console.log('query follower by user', result)
    var promises = result.map(async item=>{
        let userInfo = await isUserExist(item.follower)
        return userInfo
    })

    var followerList = await Promise.all(promises)

    errHandler(null, followerList, res)

})

module.exports = router;