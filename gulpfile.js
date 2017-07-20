/*
 * @Author: bxm09
 * @Date:   2017-07-20 17:35:38
 * @Last Modified by:   bxm09
 * @Last Modified time: 2017-07-20 20:54:47
 */

const gulp = require('gulp');
const gulpSequence = require('gulp-sequence'); // 设置 gulp task 的顺序
// const del = require('del'); // 清除文件
// const rev = require('gulp-rev'); // 自动添加 hash 后缀版本号
// const revReplace = require('gulp-rev-replace'); // 更新由 gulp-rev 重命名的文件名的引用
// const useref = require('gulp-useref'); // 在 HTML 中用注释的形式写一些构建块
// const filter = require('gulp-filter'); // 筛选并恢复文件
// const htmlmin = require('gulp-htmlmin'); // 压缩 HTML 代码。
// const htmlReplace = require('gulp-html-replace'); // html 文件对合并文件后的替换处理插件
// const minifyCSS = require('gulp-minify-css'); // 压缩 CSS 代码。
// const imagemin = require('gulp-imagemin'); // 图片压缩
// const less = require('gulp-less')
// const uglify = require('gulp-uglify'); // 压缩 JS 代码
// const csso = require('gulp-csso'); // 压缩 CSS 代码。注意：/*! */这样的注释不会被压缩和删除，一般用来写版权信息
// const yargs = require('yargs'); // node.js 命令行框架
// const requireDir = require('require-dir'); // 包含文件
// const copy = require('copy'); // 复制文件
// const gulpif = require('gulp-if'); // gulp 判断语句
// const util = require('gulp-util'); // 命令行输出
// const concat = require('gulp-concat'); // 字符串拼接(合并文件)
// const webpack = require('webpack'); // 构建
// const gulpWebpack = require('webpack-stream'); // 基于流的构建
// const plumber = require('gulp-plumber'); // 处理文件信息流
// const named = require('vinyl-named'); // 文件命名
// const rename = require('gulp-rename'); // 文件重命名

const livereload = require('gulp-livereload'); // 浏览器热更新，不用F5了
// const browserSync = require('browser-sync'); // 热更新
// const reload = browserSync.reload;

const $ = require('gulp-load-plugins')();
const openUrl = require('open'); // 自动打开指定网址
const nodemon = require('gulp-nodemon'); // node 自动重启
// const expressServer = require('gulp-express'); // please use gulp-live-server instead
// const gls = require('gulp-live-server'); // 启动服务器


// default task
gulp.task('default', ['build']);

// 设置 gulp task 的顺序
gulp.task('build', gulpSequence('clean', 'views', 'styles', 'images', 'scripts', 'html', 'watch', ['serve']));

// 清空指定文件夹里的文件(清除旧部署文件)
gulp.task('clean', function() {
    return;
});

// 处理模板 views 信息
gulp.task('views', function() {
    return;
});

// 处理 css 文件
gulp.task('styles', function() {
    return;
});

// 处理图片文件
gulp.task('images', function() {
    return;
});

// 处理 js 代码
gulp.task('scripts', function() {
    return;
});

// 处理 HTML 文件
gulp.task('html', function() {
    return;
});

// 热更新
gulp.task('watch', function() {
    return;
});

// node 自动重启
gulp.task('serve', function() {
    $.nodemon({
        script: './bin/www',
    });

    openUrl('http://localhost:3000');
});
