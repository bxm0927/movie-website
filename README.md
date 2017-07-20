
# 电影网站

![图片预览](http://oph264zoo.bkt.clouddn.com/17-7-20/4151066.jpg)

此项目是基于 Node.js + Express + mongoDB + Bootstrap 搭建的电影网站。

主要功能模块：

- 一期：前台电影展示页、电影详情页、后台电影管理中心（电影录入、电影修改）
- 二期：用户登录注册注销功能、用户识别和持久化、后台用户管理中心（用户录入、用户修改）、电影评论


## 技术栈

【前端】

+ HTML/CSS/JS：亘古不变三件套
+ ES6：ECMAScript 新一代语法，这也是以后的趋势
+ Monment.js：时间日期格式化插件
+ jQuery：主要用到 jQuery 的 ajax 方法处理异步请求和 DOM 操作
+ Bootstrap：页面 UI 框架，天然响应式，但是样式烂大街...

【后端】

+ pug：pug (以前的 jade) 是一个高性能的模板引擎，用来生成 HTML
+ Node.js：整个后端由 Node.js 驱动；用 npm 安装资源文件
+ Express：一个基于 Node.js 平台的 web 开发框架，由路由和中间件构成

【数据库】

+ mongoDB：进行数据存储的 NoSQL 数据库
+ mongoose：Node.js 的 mongodb 驱动软件包，是进行 mongoDB 快速建模的工具

【自动化构建】

+ gulp：前端自动化构建工具
+ JSHint：JS 代码校验


## 收获

1. 熟悉了 pug 的语法及其在 Node.js 中的使用方法，了解到 pug 的优缺点及如何取舍
2. 初步掌握了 express 框架的使用，如何处理路由以及中间件
3. 掌握了 mongoose 在 Node.js 中如何连接数据库，以及 schema、model、entity 的使用
4. 前后端数据传递与视图展现的流程
5. 学会了使用 bcryptjs（Node.js 的一个加解密模块）对密码进行 “hash + salt” 处理
6. 借助会话与 cookie 进行用户识别和持久化


## TODO

1. 用户登录注册未做表单校验等等
2. 全面 Promise 化
3. 升级成 ejs 模版
4. 电影评论功能的功能过于简化
5. 增加个人中心
6. 前后台请求尽量使用 ajax 异步获取
7. 还有很多...


## Build Setup

```
# clone the repo into your disk.
$ git clone https://github.com/bxm0927/movie-website.git

# install dependencies
$ npm install

# run
$ npm start

# visit
$ http://localhost:3000/
```


## License

The code is available under the [MIT license](LICENSE.txt).


## Thanks

@Scott
