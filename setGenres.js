var connection = require('./mysqlConnection');

module.exports = function(req, res, next) {
    var query = 'SELECT * FROM genres';
    connection.query(query, function(err, rows) {
        res.locals.genres = rows;
        next();
    });
};