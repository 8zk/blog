var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
    var getQuery = 'SELECT * FROM works'
    connection.query(getQuery, function(err, works) {
        res.render('works', {
            title: 'Works'
        });
    });
});

module.exports = router;