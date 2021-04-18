# hitsz-weibo-system

## 项目简介

CS架构的简易版微博

## 已实现功能

- 用户注册、登录、退出登录，后端动态维护用户的登录状态
- 发表动态
- 评论动态，回复评论
- 拥有个人主页，也可以进入他人的主页
- 按内容搜索动态
- 关注某个用户，查看自己的关注和被关注列表
- 给动态点赞、反对

## 框架和依赖

### 前端

- vue2

- axios
- muse-ui
- vue-router
- less

### 后端

- express
- nodemon
- cors
- mongoose
- mongodb

# 运行方式

1. 进入server目录，命令行运行`npm i`和`node ./bin/www`
2. 进入client目录，命令行运行`npm i`和`npm run serve`
3. 浏览器打开http://localhost:8080