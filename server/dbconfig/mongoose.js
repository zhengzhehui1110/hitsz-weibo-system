const mongoose = require('mongoose');

// 数据库的端口号
const config = {
    mongodb : 'mongodb://localhost:27017/weibo_db'
}

module.exports = ()=>{
    //  mongoose.Promise = global.Promise;//如果有promise的问题，可以用这个试试
    mongoose.connect(config.mongodb, (err)=>{
        if(!err){
            console.log("连接数据库成功");
        }
    });//连接mongodb数据库
    // 让 mongoose 使用全局 Promise 库
    mongoose.Promise = global.Promise;
    // 实例化连接对象
    var db = mongoose.connection;
    db.on('error', () => {   // 连接异常
        console.log('Mongoose: connection error');  
    });
    db.on('connected',  () => {
        console.log('Mongoose: connection open');  
    });
    db.once('open', (callback) => {
        console.log('Mongoose: connect');
    });
    db.on('disconnected',  ()=> {    // 连接断开 
        console.log('Mongoose: connection disconnected');  
    }); 
    
    
    return db;
}