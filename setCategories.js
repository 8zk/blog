var connection = require('./mysqlConnection');

module.exports = function(req, res, next) {
    var pageName = req.originalUrl.substr(1) ? req.originalUrl.substr(1) : 'top';
    pageName = (pageName.indexOf('blog') != -1) ? 'blog' : pageName;
    var query = 'SELECT * FROM categories';
    connection.query(query, function(err, rows) {
        res.locals.categories = rows;
        res.locals.pageName = pageName;
        next();
    });
};
