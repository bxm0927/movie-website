/*
 * @Author: bxm09
 * @Date:   2017-07-18 19:46:48
 * @Last Modified by:   bxm09
 * @Last Modified time: 2017-07-20 08:57:12
 */

/**
 * 电影模型
 */
const mongoose = require('mongoose');

// 在声明中指定 ObjectId 类型
let ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * 定义一个 Schema 模式
 * Schema 对象定义文档结构，可以定义字段、类型、唯一性、索引、验证等。
 * new Schema() 中传入一个 JSON 对象，定义属性和属性类型
 */

let movieSchema = new mongoose.Schema({
    title: String,
    doctor: String,
    country: String,
    year: Number,
    poster: String,
    flash: String,
    summary: String,
    language: String,
    category: {
        type: ObjectId,
        ref: 'categoryModel'
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

/**
 * Schema 不仅定义了文档结构和使用性能，还可以有扩展插件、实例方法、静态方法、复合索引、文档生命周期钩子
 * pre('save') 每次 save 时都会调用此方法
 *      如果数据是新加的，创建时间、更新时间都显示当前时间
 *      如果数据已经有了，只更新时间显示当前时间
 */

movieSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createdAt = Date.now();
        this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
})

/**
 * 静态方法
 * findAll() 取出数据库所有数据
 * findById() 根据 id 取数据
 */

movieSchema.statics = {
    findAll: function(cb) {
        return this.find({}).sort('meta.createAt').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({ _id: id }).exec(cb);
    }
};

module.exports = movieSchema;
