let mongoose = require('mongoose');
let commentSchema = require('../schema/commentSchema');

// 将 commonSchema 这个模式发布为 Model
// common -> commons
let commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;
