// 返回给前端的统一数据格式
var res = (errCode, errMsg, data) => {
    return {
        code: errCode,
        errMsg: errMsg || '',
        data: data,
    }
}

module.exports = res;