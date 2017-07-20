/*
* @Author: bxm09
* @Date:   2017-07-18 19:46:48
* @Last Modified by:   bxm09
* @Last Modified time: 2017-07-20 08:38:09
*/

/**
 * 用户模型
 */
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const SALT_WORK_FACTOR = 10; // bcrypt 盐的强度

/**
 * 定义一个 Schema 模式
 * Schema 对象定义文档结构，可以定义字段、类型、唯一性、索引、验证等。
 * new Schema() 中传入一个 JSON 对象，定义属性和属性类型
 */

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    // 10   > normal user
    // 20   > verified user
    // 30   > super user
    // 100  > admin
    // 200  > super admin
    role: {
        type: Number,
        default: 10
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

userSchema.pre('save', function(next) {
    let user = this;

    if (this.isNew) {
        this.meta.createdAt = Date.now();
        this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    // 先生成一个随机的的盐，再 hash 加密
    bcryptjs.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }

        bcryptjs.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        })
    })
})

/**
 * 静态方法：model 调用的方法
 * findAll() 取出数据库所有数据
 * findById() 根据 id 取数据
 */

userSchema.statics = {
    findAll: function(cb) {
        return this.find({}).sort('meta.createAt').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({ _id: id }).exec(cb);
    }
};

/**
 * 实例方法：entity 调用的方法
 * comparePassword() 登录密码匹配
 */

userSchema.methods = {
    comparePassword: function(password, cb) {
        // this.password 数据库中的 password
        bcryptjs.compare(password, this.password, function(err, isMatch) {
            if (err) {
                return cb(err);
            }

            cb(null, isMatch);
        });
    }
}

module.exports = userSchema;
