var mongoose=require('mongoose');
var LikeSchema = require('../schemas/like')

var Like = mongoose.model('Like', LikeSchema);

module.exports = Like;