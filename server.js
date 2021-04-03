const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
port = process.env.PORT || 3000;

var cors = require('cors')
app.use(cors()) // Use this after the variable declaration

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: '127.0.0.1',
    user: 'jescalante02',
    password: 'Durango.99',
    database: 'LostAndFound'
});

// connect to database
mc.connect();
app.listen(port);
console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/appRoutes'); //importing route
routes(app); //register the route


