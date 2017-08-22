// Require.js allows us to configure shortcut alias
require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../libs/js/jquery',
        underscore: '../libs/js/underscore',
        backbone: '../libs/js/backbone',
        text: '../libs/js/text'
    }
});

require([
    'jquery',
    'backbone',
    'routers/Router'
], function($, Backbone, Router) {
    'use strict';

    // Initialize the application view
    var router;
    router = new Router();
});