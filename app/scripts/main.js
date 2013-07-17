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
        paginator : {
            deps : [
                'jquery',
                'backbone'
            ],
            exports : 'Backbone.Paginator'
        },
        prism : {
            exports: 'Prism'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
        text: '../bower_components/requirejs-text/text',
        paginator : '../bower_components/backbone.paginator/lib/backbone.paginator',
        prism : '../bower_components/prism/prism'
    }
});

require([
    'common',
    'routes/router',
    'backbone'
], function (Common, Router, Backbone) {
    Common.init({
        onload : function() {
            new Router();
            Backbone.history.start();
        }
    });
});