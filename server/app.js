var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var app = express();

var cors = require('cors'); // 解决跨域问题
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由
var articalRouter = require('./routes/artical');
var usersRouter = require('./routes/users');
var commentRouter = require('./routes/comment');
var followRouter = require('./routes/follow');

app.use('/artical', articalRouter);
app.use('/users', usersRouter);
app.use('/comment', commentRouter);
app.use('/follow', followRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 数据库
var mongoose = require('./dbconfig/mongoose.js');
var db = mongoose();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
