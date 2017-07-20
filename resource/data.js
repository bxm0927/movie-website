const express = require('express');
const static = require('express-static');
const bodyParser = require('body-parser');
const path = require('path');

let port = process.env.PORT || 3000;
let app = express();

app.set('views', './views/pages');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(static(path.join(__dirname, 'bower_components/')))
app.listen(port);

console.log(`server running at localhost: ${port}`);

// index page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'index page',
        movies: [{
            title: '机械战警',
            _id: 1,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        }, {
            title: '机械战警',
            _id: 2,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        }, {
            title: '机械战警',
            _id: 3,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        }, {
            title: '机械战警',
            _id: 4,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        }, {
            title: '机械战警',
            _id: 5,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        }, {
            title: '机械战警',
            _id: 6,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        }]
    });
});

// detail page
app.get('/movie/:id', (req, res) => {
    res.render('detail', {
        title: 'detail page',
        movie: {
            doctor: '何塞趴地利亚',
            country: '美国',
            title: '机械战警',
            year: 2014,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
            language: '英语',
            flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
            summary: '这是一部科幻片'
        }
    });
});

// list page
app.get('/admin/list', (req, res) => {
    res.render('list', {
        title: 'learning nodejs list page',
        movies: [{
            title: '机械战警',
            _id: 1,
            doctor: '何塞趴地利亚',
            country: '美国',
            year: 2014,
            language: '英语',
            flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf'
        }]
    });
});

// list page
app.get('/admin/movie', (req, res) => {
    res.render('admin', {
        title: 'admin page 后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    });
});
