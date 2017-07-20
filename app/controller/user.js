/*
 * @Author: bxm09
 * @Date:   2017-07-18 20:00:04
 * @Last Modified by:   bxm09
 * @Last Modified time: 2017-07-20 08:16:28
 */

/**
 * 处理用户控制逻辑
 */

const userModel = require('../model/mongoose/model/userModel');
const _ = require('underscore');

/**
 * 用户权限中间件
 * 判断用户是否登录
 *     若未登录（无 session），就重定向到登录页
 */
exports.user_req = function(req, res, next) {
    let user = req.session.user;

    if (!user) {
        console.log('未登录，没有访问权限！')
        return res.redirect('/signin');
    }

    next();
};

/**
 * 用户权限中间件
 * 判断用户角色
 */
exports.admin_req = function(req, res, next) {
    let user = req.session.user;
    // console.log(user.role)

    if (user.role !== 100 && user.role !== 200) {
        return res.redirect('/');
    }

    next();
};

/**
 * 登录页
 */
exports.show_signup = function(req, res) {
    res.render('signup', {
        title: '注册页'
    });
};

/**
 * 注册页
 */
exports.show_signin = function(req, res) {
    res.render('signin', {
        title: '登录页'
    });
};

/**
 * 用户注册逻辑
 * 先拿到 post 过来的 name、password 值，去数据库中查询，
 *     若 name 存在，返回 “用户名已存在”；
 *     若 name 不存在，就存到数据库，返回 “注册成功”。
 */
exports.signup = function(req, res) {
    let userObj = req.body.user;
    // let userObj = req.param('user'); // deprecated

    // console.log(userObj); // { name: '1', password: '2' }

    userModel.findOne({ name: userObj.name }, function(err, user) {
        if (err) {
            console.log(err);
        }

        if (user) {
            // 重定向
            console.log('注册失败，用户名已存在！')
            return res.redirect('/signup');
        } else {
            let newUser = new userModel(userObj);

            newUser.save(function(err, user) {
                if (err) {
                    console.log(err);
                }

                // console.log(newUser);

                // 重定向
                console.log('注册成功！')
                res.redirect('/signin');
            });
        }
    });
};

/**
 * 用户登录逻辑
 * 先拿到 post 过来的 name、password 值，去数据库中查询，
 *     若 name 不存在，返回 “用户名不存在”；
 *     若 name 存在，将 post 过来的 password 值与 数据库中的 password 值比对
 *         若不一致，返回 “密码错误”；
 *         若一直，返回 “登录成功”。
 */
exports.signin = function(req, res) {
    let userObj = req.body.user;
    let name = userObj.name;
    let password = userObj.password;

    // 在数据库中查询
    userModel.findOne({ name: name }, function(err, result) {
        if (err) {
            console.log(err);
        }

        if (!result) {
            console.log('登录失败，用户名不存在！');
            return res.redirect('/signin');
        }

        result.comparePassword(password, function(err, isMatch) {
            if (err) {
                console.log(err);
            }

            if (isMatch) {
                // session 存储
                req.session.user = result;

                console.log('登录成功！');
                return res.redirect('/');
            } else {
                console.log('登录失败，密码错误！');
                return res.redirect('/signin');
            }
        });
    })
};

/**
 * 用户注销逻辑
 * 删除该用户的 session
 */
exports.user_logout = function(req, res) {
    delete req.session.user;

    // 重定向
    console.log('注销成功！')
    res.redirect('/');
};

/**
 * 用户列表页逻辑
 * 取到用户的 session，
 */
exports.user_list = function(req, res) {
    userModel.findAll(function(err, users) {
        if (err) {
            console.log(err);
        }

        res.render('user_list', {
            title: '后台用户管理页',
            users: users
        });
    });
};

/**
 * 存储一个新用户存储页
 */
exports.add_user = function(req, res) {
    res.render('add_user', {
        title: '用户用户录入页',
        user: {
            name: '',
            password: '',
            role: 10
        }
    });
};

/**
 * 用户录入逻辑
 */
exports.save_user = function(req, res) {
    let id = req.body.user._id;
    let userObj = req.body.user;
    let postUser = null;

    // 若 id 存在则更新，不存在就创建
    if (id) {
        console.log('修改失败，用户名已存在！');

        userModel.findById(id, function(err, user) {
            if (err) {
                console.log(err);
            }

            // postUser = Object.assign({}, user, movieObj);
            // 用 underscore 替换对象
            postUser = _.extend(user, userObj);
            postUser.save(function(err, user) {
                if (err) {
                    console.log(err);
                }

                // 重定向
                res.redirect('/admin/user_list');
            });
        });
    } else {
        postUser = new userModel({
            name: userObj.name,
            password: userObj.password,
            role: userObj.role
        });

        postUser.save(function(err, user) {
            if (err) {
                console.log(err);
            }

            // 重定向
            res.redirect('/admin/user_list');
        });
    }
};

// 修改用户
exports.user_update = function(req, res) {
    let id = req.params.id;
    console.log(id)

    if (id) {
        userModel.findById(id, function(req, user) {
            res.render('add_user', {
                title: '后台用户修改页',
                user: user
            });
        });
    }
};

// 删除用户
exports.user_delete = function(req, res) {
    let id = req.query.id;

    if (id) {
        userModel.remove({ _id: id }, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: 1 });
            }
        });
    }
};
