let mongoose = require('mongoose');
let userSchema = require('../schema/userSchema');

// 将 movieSchema 这个模式发布为 Model
// user -> users
let userModel = mongoose.model('user', userSchema);

module.exports = userModel;
