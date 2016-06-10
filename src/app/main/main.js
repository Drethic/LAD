/*global require*/
/* jshint -W097 */
'use strict';

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
    },
    backboneLocalstorage: {
      deps: ['backbone'],
      exports: 'Store'
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
  /*jshint nonew:false*/

  // Initialize the application view
  new Router();
});