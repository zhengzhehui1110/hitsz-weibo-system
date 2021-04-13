var mongoose=require('mongoose');
var articalSchema = require('../schemas/artical')

// 为所有动态建表
var Artical = mongoose.model('Artical', articalSchema)

module.exports = Artical