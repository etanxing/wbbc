/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) {
    'use strict';

    var app = (function () {
        var _server = 'http://localhost:7777/', //http://wbb.ap01.aws.af.cm/ http://localhost:7777/
            _router = '',
        	_status = new Backbone.Model({
        		processing : false,
                router : '',
                doctitle : ''
        	});

        var _options = {
        	loading : function (status, options) {
                $('html,body').animate({scrollTop: 0 }, $('body').scrollTop()/4 , function() {
                    $('body').toggleClass('processing', status.get('processing'));
                });
        	},

        	onload : function (model, response, options) {
        		console.log('default onload');
        	},

            changeTitle : function(model, title) {
                document.title = title ;
            }
        }

        var _init = function (options, context) {        	
            var opts = _.defaults(options || {}, _options);

            (new Backbone.Collection()).fetch({
            	url: _server + 'api/settings',
            	success : function(collection) {
                    var settings = {};
                    collection.each(function (model){
                        settings[model.get('name')] = model.get('value');
                    });
                    context.settings = settings;
            		opts.onload(settings);
            	}
            });

            _status.on('change:processing', opts.loading);
            _status.on('change:doctitle', opts.changeTitle);
        };

        return {
            status: {
            	set : function (name, value) {
            		_status.set(name, value);
            	},

            	get : function (name) {
            		return _status.get(name);
            	}
            },

            init: function (options) {
                _init(options, this);
            },

            server : _server //http://localhost:7777
        };    
    })();

    return app;
});