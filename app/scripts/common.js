/*global define*/

define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    'use strict';

    var app = (function() {
        var _server = 'http://localhost:7777/', //http://wbb.ap01.aws.af.cm/ http://localhost:7777/
            _router = '',
            _status = new Backbone.Model({
                processing: false,
                router: '',
                doctitle: ''
            }),
            _options = {
                loading: function(status, processing) {
                    $('html,body').animate({
                        scrollTop: 0
                    }, $('body').scrollTop() / 4, function() {
                        $('body').toggleClass('processing', processing);
                    });
                },

                onload: function(model, response, options) {
                    console.log('default onload');
                },

                changeTitle: function(status, title) {
                    document.title = title;
                }
            },

            _init = function(options, context) {
                var opts = _.defaults(options || {}, _options),
                    url = _server + 'api/bootstrap' + Backbone.history.location.pathname + '?$perpage=3&slug=' + Backbone.history.location.hash.slice(1);

                $.ajax({
                    url: url,
                    success: function(data, resp, xhr) {
                        //Settings
                        var settings = {};
                        _.each(data.settings, function(setting) {
                            settings[setting.name] = setting.value;
                        });
                        context.settings = settings;
                        opts.onload(data);
                    },
                    error : function(xhr, resp, err) {

                    }
                });

                _status.on('change:processing', opts.loading);
                _status.on('change:doctitle', opts.changeTitle);
            };

        return {
            status: {
                set: function(name, value) {
                    _status.set(name, value);
                },

                get: function(name) {
                    return _status.get(name);
                }
            },

            init: function(options) {
                _init(options, this);
            },

            server: _server //http://localhost:7777
        };
    })();

    return app;
});
