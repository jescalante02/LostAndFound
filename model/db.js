'use strict';
var mysql = require('mysql');
//local mysql db connection
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'jescalante02',
    password: 'Durango.99',
    database: 'LostAndFound'
});
connection.connect(function (err) {
    if (err) throw err;
});
module.exports = connection;
