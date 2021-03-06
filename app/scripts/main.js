/*global require*/
'use strict';

require.config({
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
        paginator: {
            deps: [
                'jquery',
                'backbone'
            ],
            exports: 'Backbone.Paginator'
        },
        prism: {
            exports: 'Prism'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
        text: '../bower_components/requirejs-text/text',        
        paginator : 'vendor/backbone.paginator',
        prism: '../bower_components/prism/prism',
        moment: '../bower_components/moment/moment',
    }
});

require([
    'routes/router',
    'backbone',
    'common'
], function(Router, Backbone, Common) {
    Backbone.history.start();
    
    Common.init({
        onload: function(data) {
            new Router({data : data });            
        }
    });

});
