var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World from the lad-app! The current NODE_ENV=' + process.env.NODE_ENV);
});

app.listen(3000, function () {
  console.log('lad-app listening on port 3000!');
});