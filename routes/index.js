var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: '8zk'
    });
});

module.exports = router;