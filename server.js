var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost/lad');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var apiRoutes = require('./src/api/routes');
var rootRouter = require('./src/app/routes');

app.use('/', rootRouter);
app.use('/api', apiRoutes);

app.listen(port);
console.log('Magic happens on port ' + port);