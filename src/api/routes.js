module.exports = (function() {
    'use strict';
    var router = require('express').Router();

    router.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    return router;
})();