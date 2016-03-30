var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var multer = require('multer');
var upload = multer({ dest: './public/images/blog/' });
var fs = require('fs');
var moment = require('moment');
var nl2br  = require('nl2br');

router.get('/', function(req, res, next) {
    var getBlogQuery = 'SELECT *, DATE_FORMAT (created_at, \'%Y-%m-%d %k:%i\') AS created_at FROM blogs ORDER BY created_at DESC';
    connection.query(getBlogQuery, function (err, blogs) {
        res.render('blog', {
            title: 'Blog',
            blogList: blogs
        });
    });
});

router.get('/create', function(req, res, next) {
    var getGenreQuery = 'SELECT * FROM genres';
    connection.query(getGenreQuery, function(err, genres) {
        res.render('create', {
            title: 'Create',
            genres: genres
        });
    });
});

router.post('/create', upload.single('blog_image'), function(req, res, next) {
    var oldPath = req.file.path;
    var newPath = req.file.path + '.png';
    var imagePath = '/images/blog/' + req.file.filename + '.png';
    var title = req.body.blog_title;
    var blog = req.body.blog_input;
    var genre_id = req.body.genre_id;
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var blogQuery = 'INSERT INTO blogs (title, blog, genre_id, image_path, created_at) VALUES ("' + title + '", "' + blog + '", "' + genre_id + '", "' + imagePath + '", "' + createdAt + '")';
    fs.renameSync(oldPath, newPath);
    connection.query(blogQuery, function(err, rows) {
        console.log(err);
        res.redirect('/blog');
    });
});

router.get('/:blog_id', function(req, res, next) {
    var blogId = req.params.blog_id;
    var getBlogQuery = 'SELECT *, DATE_FORMAT (created_at, \'%Y-%m-%d %k:%i\') AS created_at FROM blogs B LEFT JOIN genres G ON B.genre_id = G.genre_id WHERE blog_id =' + blogId;
    connection.query(getBlogQuery, function (err, blog) {
        blog[0].blog = nl2br(blog[0].blog);
        res.render('blogDetail', {
            title: blog[0].title,
            blog: blog[0]
        });
    });
});


module.exports = router;