var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World from the lad-api!');
});

app.listen(3001, function () {
  console.log('lad-api listening on port 3001!');
});