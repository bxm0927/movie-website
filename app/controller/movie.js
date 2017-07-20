/*
 * @Author: bxm09
 * @Date:   2017-07-18 20:21:30
 * @Last Modified by:   bxm09
 * @Last Modified time: 2017-07-20 10:19:37
 */

/**
 * 处理电影控制逻辑
 */

const movieModel = require('../model/mongoose/model/movieModel');
const commentModel = require('../model/mongoose/model/commentModel');
const _ = require('underscore');

// GET detail page.
exports.detail = function(req, res) {
    // 取到 url '/detail/:id' 中的 id
    let id = req.params.id;

    movieModel.findById(id, function(err, movie) {
        // 取到该电影的评论数据
        commentModel.find({ movie: id }, function(err, comments) {
            console.log(comments);

            if (err) {
                console.log(err);
            }

            res.render('detail', {
                title: '电影详情页',
                movie: movie,
                comments: comments
            });
        });

    });
};

// GET add_movie page.
exports.add_movie = function(req, res) {
    res.render('add_movie', {
        title: '后台电影录入页',
        movie: {
            title: '机械战警',
            doctor: '何塞趴地利亚',
            country: '美国',
            year: '2014',
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
            flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
            summary: '机械战警 编辑 《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。',
            language: '英语'
        }
    });
};

// add_movie page - post
exports.movie_save = function(req, res) {
    let id = req.body.movie._id;
    let movieObj = req.body.movie;
    let postMovie = null;

    // 若 id 存在则更新，不存在就创建
    if (id) {
        movieModel.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }

            // postMovie = Object.assign({}, movie, movieObj);
            // 用 underscore 替换对象
            postMovie = _.extend(movie, movieObj);
            postMovie.save(function(err, movie) {
                if (err) {
                    console.log(err);
                }

                // 重定向
                res.redirect('/detail/' + movie._id);
            });
        });
    } else {
        postMovie = new movieModel({
            title: movieObj.title,
            doctor: movieObj.doctor,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            flash: movieObj.flash,
            summary: movieObj.summary
        });

        postMovie.save(function(err, movie) {
            if (err) {
                console.log(err);
            }

            // 重定向
            res.redirect('/detail/' + movie._id);
        });
    }
};

// GET movie-list page.
exports.movie_list = function(req, res) {
    movieModel.findAll(function(err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('movie_list', {
            title: '后台电影管理页',
            movies: movies
        });
    });
};

// movie- page - update
exports.movie_update = function(req, res) {
    let id = req.params.id;

    if (id) {
        movieModel.findById(id, function(req, movie) {
            res.render('add_movie', {
                title: '后台电影更新页',
                movie: movie
            });
        });
    }
};

// movie- page - delete
exports.movie_delete = function(req, res) {
    let id = req.query.id;

    if (id) {
        movieModel.remove({ _id: id }, function(err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: 1 });
            }
        });
    }
};
