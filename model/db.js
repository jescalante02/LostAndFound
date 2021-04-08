'use strict';
var mysql = require('mysql');
//local mysql db connection
var connection = mysql.createConnection({
    host: '45.55.136.114',
    user: 'megaLost_S2021',
    password: 'mega!b00m!',
    database: 'megaLost_S2021'
});
connection.connect(function (err) {
    if (err) throw err;
});
module.exports = connection;
