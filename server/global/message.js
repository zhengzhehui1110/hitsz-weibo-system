// 返回给前端的文字信息

const msgMap = { // 错误码和报错信息一一对应
    '11000': '该用户已存在',
}

var msg = function(err) {
    if(!err) {
        return '成功';
    }
    else if (err.errors) {
        for(let item in err.errors) {
            if (err.errors[item] && err.errors[item].message) return err.errors[item].message
        }
        // return err.errors[0].message
    } 
    else if (err.code) {
        return msgMap[err.code.toString()]
    }
    else return '出错了'
}

module.exports = msg;
