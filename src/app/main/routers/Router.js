define(['jquery', 'backbone', 'models/Model', 'views/View'],

    function($, Backbone, Model, View) {
        'use strict';

        var Router = Backbone.Router.extend({
            initialize: function() {
                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();
            },
            // All of your Backbone Routes (add more)
            routes: {
                // When there is no hash on the url, the home method is called
                '': 'index'
            },
            index: function() {
                // Instantiates a new view which will render the header text to the page
                var view;
                view = new View();
            }
        });

        return Router;
    }
);