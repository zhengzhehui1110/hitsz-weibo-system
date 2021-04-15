var express = require('express');
var router = express.Router();
var Artical = require('../db/models/artical')
var User = require('../db/models/user')
var Comment = require('../db/models/comment')
var errHandler = require('../global/errHandler')
// 查询该用户是否存在
var isUserExist = require('../db/handler/queryUserById')


Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
                .length)));
        }
    }
    return fmt;
}

// 发布一条评论
router.post('/post', async (req, res, next)=>{
    // var comment = new Comment({
    //     text: '测试评论',
    //     authorId: '60770314b1ffa54ffc03ecd2',
    //     authorName: '灰灰子测试',
    //     postTime: Date.now(),
    //     articalId: '6077055eb1ffa54ffc03ecd3',
    // })
    var comment = new Comment({
        ...req.body
    })

    // var isUser = isUserExist(artical.authorId)
    var user = await isUserExist(comment.authorId)
    // 只有用户存在且在线，才能发送评论
    if(user && user.state){
        console.log('new comment:', comment);

        comment.save((err)=>{
            errHandler(err, comment, res)
        })
    }
    else {
        errHandler('用户未登录', comment, res, '请重新登录')
    }
})

// 查询一条动态下的所有评论，包括子评论
router.post('/queryByArtical', async (req, res, next)=>{
    let articalId = req.body._id
    var comments = await Comment.find(
        {
            articalId: articalId,
            fatherCommentId: '0',
        }
    ).sort(
        {
            postTime: -1,
        }
    ).lean()

    var promises = comments.map(async item=>{
        let children = await Comment.find(
                {
                    articalId: item.articalId,
                    fatherCommentId: item._id,
                }
            ).sort(
                {
                    postTime: -1,
                }
            ).lean()
        
        let newComment = item
        newComment.children = children
            // console.log('new comment:',newC);
        return newComment
    })
    var commentsWithChildren = await Promise.all(promises)

    console.log('get comments:', commentsWithChildren);
    errHandler(null, commentsWithChildren, res)

})


module.exports = router;