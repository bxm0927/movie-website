/*
 * @Author: bxm09
 * @Date:   2017-07-20 09:02:46
 * @Last Modified by:   bxm09
 * @Last Modified time: 2017-07-20 15:46:04
 */

/**
 * 电影分类逻辑
 */

const categoryModel = require('../model/mongoose/model/categoryModel');

exports.add_category = function(req, res) {
    res.render('add_category', {
        title: '电影分类录入页',
        category: {
            name: '普通分类'
        }
    });
};

exports.save_category = function(req, res) {
    let _category = req.body.category;
    // console.log(_category); // { name: '普通分类' }

    let category = new categoryModel(_category);

    category.save(function(err, category) {
        if (err) {
            console.log(err);
        }

        res.redirect('/admin/category_list');
    });
};

exports.category_list = function(req, res) {
    categoryModel.findAll(function(err, categorys) {
        if (err) {
            console.log(err);
        }

        res.render('category_list', {
            title: '电影分类列表',
            categorys: categorys
        });
    });
};
