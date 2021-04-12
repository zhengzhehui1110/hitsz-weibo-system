var resData = require('./resStructure')
var msg = require('../global/message')

// 拦截数据库错误信息进行处理，并向前端返回统一格式的数据
var errHandler = function (err, data, res, msgConfig) {
    // msgConfig可以为空
    if(err) {
        // console.log('document wrong:',err)
        res.send(resData(err.code || '', msgConfig || msg(err), err))
    }
    else {
        res.send(resData('e0000', msg(), data))
    }
}

module.exports = errHandler;