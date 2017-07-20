let mongoose = require('mongoose');
let movieSchema = require('../schema/movieSchema');

// 将 movieSchema 这个模式发布为 Model
// movie -> movies
let movieModel = mongoose.model('movie', movieSchema);

module.exports = movieModel;
