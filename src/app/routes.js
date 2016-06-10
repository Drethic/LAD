module.exports = (function() {
  'use strict';
  var express = require('express');
  var router = express.Router();
  var path = require('path');

  router.use(express.static(__dirname));
  router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  });

  return router;
})();